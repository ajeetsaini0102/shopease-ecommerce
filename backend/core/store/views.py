from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from django.contrib.auth.models import User
from django.conf import settings

from .models import Product, Order, OrderItem
from .serializers import (
    ProductSerializer,
    OrderSerializer,
    RegisterSerializer,
)

import razorpay


# =========================
# PRODUCT VIEWS
# =========================

class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


# =========================
# ORDER VIEW
# =========================

class OrderCreateView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


# =========================
# REGISTER VIEW
# =========================

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


# =========================
# RAZORPAY CREATE ORDER
# =========================

class CreateRazorpayOrderView(APIView):

    def post(self, request):

        amount = request.data.get("amount")

        if not amount:
            return Response(
                {"error": "Amount is required"},
                status=400
            )

        client = razorpay.Client(
            auth=(
                settings.RAZORPAY_KEY_ID,
                settings.RAZORPAY_KEY_SECRET
            )
        )

        razorpay_order = client.order.create({
            "amount": int(float(amount) * 100),
            "currency": "INR",
            "payment_capture": 1
        })

        return Response({
            "id": razorpay_order["id"],
            "amount": razorpay_order["amount"],
            "currency": razorpay_order["currency"],
            "key": settings.RAZORPAY_KEY_ID
        })


# =========================
# RAZORPAY PAYMENT VERIFY
# =========================

class VerifyRazorpayPaymentView(APIView):

    def post(self, request):

        payment_id = request.data.get(
            "razorpay_payment_id"
        )

        order_id = request.data.get(
            "razorpay_order_id"
        )

        signature = request.data.get(
            "razorpay_signature"
        )

        name = request.data.get("name")
        email = request.data.get("email")
        phone = request.data.get("phone")
        address = request.data.get("address")

        items = request.data.get(
            "items",
            []
        )

        # =========================
        # CHECK PAYMENT DATA
        # =========================

        if (
            not payment_id
            or not order_id
            or not signature
        ):
            return Response(
                {
                    "error": "Payment details are required"
                },
                status=400
            )

        try:

            # =========================
            # RAZORPAY CLIENT
            # =========================

            client = razorpay.Client(
                auth=(
                    settings.RAZORPAY_KEY_ID,
                    settings.RAZORPAY_KEY_SECRET
                )
            )

            # =========================
            # VERIFY PAYMENT
            # =========================

            client.utility.verify_payment_signature({

                "razorpay_order_id": order_id,

                "razorpay_payment_id": payment_id,

                "razorpay_signature": signature,

            })

            # =========================
            # CALCULATE TOTAL
            # =========================

            total_price = sum(

                float(item["price"])
                * int(item["quantity"])

                for item in items

            )

            # =========================
            # CREATE ORDER
            # =========================

            order = Order.objects.create(

                name=name,

                email=email,

                phone=phone,

                address=address,

                total_price=total_price

            )

            # =========================
            # CREATE ORDER ITEMS
            # =========================

            for item in items:

                product = Product.objects.get(
                    id=item["id"]
                )

                OrderItem.objects.create(

                    order=order,

                    product=product,

                    quantity=int(
                        item["quantity"]
                    ),

                    price=item["price"]

                )

            # =========================
            # SUCCESS RESPONSE
            # =========================

            return Response({

                "success": True,

                "message":
                    "Payment verified and order created successfully.",

                "order_id": order.id

            })

        # =========================
        # PAYMENT VERIFICATION ERROR
        # =========================

        except razorpay.errors.SignatureVerificationError:

            return Response(

                {
                    "success": False,

                    "message":
                        "Payment verification failed"
                },

                status=400

            )

        # =========================
        # PRODUCT NOT FOUND
        # =========================

        except Product.DoesNotExist:

            return Response(

                {
                    "success": False,

                    "message":
                        "Product not found"
                },

                status=400

            )

        # =========================
        # OTHER ERROR
        # =========================

        except Exception as error:

            print(
                "ORDER CREATION ERROR:",
                error
            )

            return Response(

                {
                    "success": False,

                    "message":
                        "Something went wrong"
                },

                status=500

            )


class MyOrdersView(APIView):

    def get(self, request):

        email = request.query_params.get("email")

        if not email:
            return Response(
                {
                    "error": "Email is required"
                },
                status=400
            )

        orders = Order.objects.filter(
            email=email
        ).order_by("-created_at")

        serializer = OrderSerializer(
            orders,
            many=True
        )

        return Response(
            serializer.data
        )