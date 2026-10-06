from django.urls import path
from .views import (
    ProductListCreateView,
    ProductDetailView,
    OrderCreateView,
    RegisterView,
    CreateRazorpayOrderView,
    VerifyRazorpayPaymentView,
    MyOrdersView,
)
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path("products/", ProductListCreateView.as_view()),
    path("products/<int:pk>/", ProductDetailView.as_view()),
    path("orders/", OrderCreateView.as_view()),
    path("register/", RegisterView.as_view()),
    path("login/", TokenObtainPairView.as_view()),
    path("payment/create-order/",CreateRazorpayOrderView.as_view()),
    path("payment/verify/",VerifyRazorpayPaymentView.as_view()),
    path("my-orders/",MyOrdersView.as_view()
),
]