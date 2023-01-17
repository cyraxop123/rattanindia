from rest_framework import serializers
from .models import *


class UserSchema(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ("id",)

class ProductSchema(serializers.ModelSerializer):
    class Meta:
        model = ExcitelProducts
        exclude = ("id",)

class ProductFinanceSchema(serializers.ModelSerializer):
    class Meta:
        model = ExcitelFinanceProducts
        exclude = ("id",)

class BankAccountSchema(serializers.ModelSerializer):
    class Meta:
        model = BankAccount
        exclude = ("id",)

class ExcitelUserProductSchema(serializers.ModelSerializer):
    class Meta:
        model = UserProduct
        exclude = ("id",)

class ExcitelUserFinanceProductSchema(serializers.ModelSerializer):
    class Meta:
        model = UserFinanceProduct
        exclude = ("id",)

class ExcitelUserProductSendSchema(serializers.ModelSerializer):
    class Meta:
        model = UserProduct
        exclude = ("id",)

class ExcitelUserFinanceProductSendSchema(serializers.ModelSerializer):
    class Meta:
        model = UserFinanceProduct
        exclude = ("id",)

class ExcitelUserTransaction(serializers.ModelSerializer):
    class Meta:
        model = Transactions
        exclude = ("id",)

class ExcitelUserWithdrawalRequest(serializers.ModelSerializer):
    # User = UserSchema()
    # Bank = BankAccountSchema()
    class Meta:
        model = withdrawalRequest
        exclude = ("id",)

class ExcitelUserGetWithdrawalRequest(serializers.ModelSerializer):
    User = UserSchema()
    Bank = BankAccountSchema()
    class Meta:
        model = withdrawalRequest
        exclude = ("id",)


class ExcitelLifafa(serializers.ModelSerializer):
    class Meta:
        model = Lifafa
        exclude = ("id",)

class ExtraDetailsSchema(serializers.ModelSerializer):
    class Meta:
        model = extraDetails
        exclude = ("id",)

class DepositSchema(serializers.ModelSerializer):
    class Meta:
        model = DepositMoney
        exclude = ("id",)

class NotificationSchema(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = "__all__"