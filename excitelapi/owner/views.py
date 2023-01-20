from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from excitelapi.utils.JWT_utlis import genJwtToken
from excitelapi.models import (
    BankAccount,
    DepositMoney,
    ExcitelFinanceProducts,
    ExcitelProducts,
    Lifafa,
    Transactions,
    User,
    UserFinanceProduct,
    UserProduct,
    extraDetails,
    ownerNumber,
    withdrawalRequest,
    Notification,
    TotalPay
)
from excitelapi.serializers import (
    DepositSchema,
    ExcitelLifafa,
    ExcitelUserGetWithdrawalRequest,
    ExcitelUserProductSchema,
    ExcitelUserTransaction,
    ExcitelUserWithdrawalRequest,
    ExtraDetailsSchema,
    ProductFinanceSchema,
    ProductSchema,
    UserSchema,
    NotificationSchema,
    TotalMoneySchema
)
from excitelapi.utils.JWT_utlis import getUserJWT

import requests

from excitelapi.utils.Transaction import genRandomTransactionId
from excitelapi.utils.TimeAndDate import checkExpireTime

SERVER_ERROR = {"success": False, "message": "Server Error"}


@api_view(["PATCH"])
@renderer_classes([JSONRenderer])
def updateLifafa(request):
    try:
        token = request.data.get("token")
        lifafa = request.data.get("lifafa")
        amount = request.data.get("amount")
        if not token or not lifafa or not amount:
            return Response({"success": False, "message": "insufficient data"})

        number = getUserJWT(token)
        if not number:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        checkNumber = ownerNumber.objects.filter(numbers=number).first()

        if not checkNumber:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        user = User.objects.filter(mobile_number=number).first()

        if not user:
            return Response({"success": False, "message": "Invalid User"})

        lifafaCode = Lifafa.objects.filter(LIFAFA_CODE=lifafa).first()
        if not lifafaCode:
            return Response({
                "success": False,
                "message": "Invalid Lifafa code"
            })

        if lifafaCode.is_active:
            return Response({
                "success": False,
                "message": "Lifafa code already activated"
            })

        lifafa = ExcitelLifafa(lifafaCode,
                               data={"amount": amount},
                               partial=True)
        if lifafa.is_valid():
            lifafa.save()
            return Response({
                "success": True,
                "message": "LIFAFA UPDATED SUCCESSFULLY"
            })

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def createLifafa(request):
    try:
        token = request.data.get("token")
        lifafa = request.data.get("lifafa")
        amount = request.data.get("amount")
        if not token or not lifafa or not amount:
            return Response({"success": False, "message": "insufficient data"})

        number = getUserJWT(token)
        if not number:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        checkNumber = ownerNumber.objects.filter(numbers=number).first()

        if not checkNumber:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        user = User.objects.filter(mobile_number=number).first()

        if not user:
            return Response({"success": False, "message": "Invalid User"})

        lifafaCode = Lifafa.objects.filter(LIFAFA_CODE=lifafa).first()
        if lifafaCode:
            return Response({
                "success": False,
                "message": "Lifafa already present"
            })

        lifafa = ExcitelLifafa(lifafaCode,
                               data={
                                   "LIFAFA_CODE": lifafa,
                                   "amount": amount
                               })
        if lifafa.is_valid():
            lifafa.save()
            return Response({
                "success": True,
                "message": "LIFAFA CREATED SUCCESSFULLY"
            })

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def getLifafa(request):
    try:
        token = request.data.get("token")
        if not token:
            return Response({"success": False, "message": "insufficient data"})

        number = getUserJWT(token)
        if not number:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        checkNumber = ownerNumber.objects.filter(numbers=number).first()

        if not checkNumber:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        user = User.objects.filter(mobile_number=number).first()

        if not user:
            return Response({"success": False, "message": "Invalid User"})

        lifafas = Lifafa.objects.all().order_by("-id")
        userLifafas = ExcitelLifafa(lifafas, many=True)
        return Response(userLifafas.data)

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["PATCH"])
@renderer_classes([JSONRenderer])
def updateUserWithdrawalRequest(request):
    try:
        token = request.data.get("token")
        status = request.data.get("status")
        reason = request.data.get("reason")
        trId = request.data.get("trId")

        if not token or not status or not trId:
            return Response({"success": False, "message": "insufficient data"})

        number = getUserJWT(token)
        if not number:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        checkNumber = ownerNumber.objects.filter(numbers=number).first()

        if not checkNumber:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        user = User.objects.filter(mobile_number=number).first()

        if not user:
            return Response({"success": False, "message": "Invalid User"})

        bankLogs = withdrawalRequest.objects.filter(
            transactionId=trId).first()

        if not bankLogs:
            return Response({
                "success": False,
                "message": "Invalid transaction id"
            })

        if not reason:
            data = {"status": status}
            sendBankLogs = ExcitelUserWithdrawalRequest(bankLogs,
                                                        data=data,
                                                        partial=True)
            if sendBankLogs.is_valid():
                sendBankLogs.save()
                getOldBalance = TotalPay.objects.first().amount
                dataForPay = TotalMoneySchema(
                    getOldBalance, data={"amount": getOldBalance + bankLogs.money}, partial=True)
                if dataForPay.is_valid():
                    dataForPay.save()
                    return Response({
                        "success":
                        True,
                        "message":
                        "Bank withdrawal request updated successfully",
                    })

        data = {"status": status, "rejection_reason": reason}
        sendBankLogs = ExcitelUserWithdrawalRequest(bankLogs,
                                                    data=data,
                                                    partial=True)
        if sendBankLogs.is_valid():
            sendBankLogs.save()

            refund_user = User.objects.filter(
                mobile_number=bankLogs.User.mobile_number).first()

            saveUserData = UserSchema(
                refund_user,
                data={"depositAmount": refund_user.depositAmount + bankLogs.money},
                partial=True)

            if saveUserData.is_valid():
                saveUserData.save()
                transactionId = genRandomTransactionId()
                data = {
                    "title": "Withdraw fail",
                    "catagory": "Withdraw",
                    "price": bankLogs.money,
                    "up_or_down": "up",
                    "transactionId": transactionId,
                    "user": refund_user.id,
                }
                transactionDetails = ExcitelUserTransaction(data=data)
                if transactionDetails.is_valid():
                    transactionDetails.save()

            return Response({
                "success":
                True,
                "message":
                "Bank withdrawal request updated successfully",
            })

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def getAllUserWithdrawalRequest(request):
    try:
        token = request.data.get("token")

        if not token:
            return Response({"success": False, "message": "insufficient data"})

        number = getUserJWT(token)
        if not number:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        checkNumber = ownerNumber.objects.filter(numbers=number).first()

        if not checkNumber:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        user = User.objects.filter(mobile_number=number).first()

        if not user:
            return Response({"success": False, "message": "Invalid User"})

        userWithdrawal = withdrawalRequest.objects.all()

        sendData = ExcitelUserGetWithdrawalRequest(userWithdrawal, many=True)
        return Response(sendData.data)

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def createProductInfo(request):
    try:
        token = request.data.get("token")
        unique_id = request.data.get("unique_id")
        title = request.data.get("title")
        validity = request.data.get("validity")
        hourly_income = request.data.get("hourly_income")
        price = request.data.get("price")
        real_price = request.data.get("real_price")
        image_url = request.data.get("image_url")

        if not token or not unique_id or not title or not validity or not hourly_income or not price or not real_price or not image_url:
            return Response({"success": False, "message": "insufficient data"})

        number = getUserJWT(token)
        if not number:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        checkNumber = ownerNumber.objects.filter(numbers=number).first()

        if not checkNumber:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        user = User.objects.filter(mobile_number=number).first()

        if not user:
            return Response({"success": False, "message": "Invalid User"})

        sendData = ProductSchema(data=request.data)

        if sendData.is_valid():
            sendData.save()
            return Response({
                "success": True,
                "message": "Product created successfully"
            })
        else:
            return Response({
                "success":
                False,
                "message":
                "Invalid products details please try again"
            })

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def getProductInfo(request):
    try:
        token = request.data.get("token")
        unique_id = request.data.get("unique_id")

        if not token or not unique_id:
            return Response({"success": False, "message": "insufficient data"})

        number = getUserJWT(token)
        if not number:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        checkNumber = ownerNumber.objects.filter(numbers=number).first()

        if not checkNumber:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        user = User.objects.filter(mobile_number=number).first()

        if not user:
            return Response({"success": False, "message": "Invalid User"})

        products = ExcitelProducts.objects.filter(unique_id=unique_id).first()

        if not products:
            return Response({"success": False, "message": "Invalid product"})

        sendData = ProductSchema(products)

        return Response(sendData.data)

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["PATCH"])
@renderer_classes([JSONRenderer])
def updateProductInfo(request):
    try:
        token = request.data.get("token")
        unique_id = request.data.get("unique_id")
        title = request.data.get("title")
        validity = request.data.get("validity")
        hourly_income = request.data.get("hourly_income")
        price = request.data.get("price")
        real_price = request.data.get("real_price")
        image_url = request.data.get("image_url")

        if not token or not unique_id or not title or not validity or not hourly_income or not price or not real_price or not image_url:
            return Response({"success": False, "message": "insufficient data"})

        number = getUserJWT(token)
        if not number:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        checkNumber = ownerNumber.objects.filter(numbers=number).first()

        if not checkNumber:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        user = User.objects.filter(mobile_number=number).first()

        if not user:
            return Response({"success": False, "message": "Invalid User"})

        products = ExcitelProducts.objects.filter(unique_id=unique_id).first()

        if not products:
            return Response({"success": False, "message": "Invalid product"})

        sendData = ProductSchema(products, data=request.data)

        if sendData.is_valid():
            sendData.save()
            return Response({
                "success": True,
                "message": "Product updated successfully"
            })
        else:
            return Response({
                "success":
                False,
                "message":
                "Invalid products details please try again"
            })

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["DELETE"])
@renderer_classes([JSONRenderer])
def deleteProductInfo(request):
    try:
        token = request.data.get("token")
        unique_id = request.data.get("unique_id")

        if not token or not unique_id:
            return Response({"success": False, "message": "insufficient data"})

        number = getUserJWT(token)
        if not number:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        checkNumber = ownerNumber.objects.filter(numbers=number).first()

        if not checkNumber:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        user = User.objects.filter(mobile_number=number).first()

        if not user:
            return Response({"success": False, "message": "Invalid User"})

        products = ExcitelProducts.objects.filter(unique_id=unique_id).first()

        if not products:
            return Response({"success": False, "message": "Invalid product"})

        products.delete()

        return Response({
            "success": True,
            "message": "Product deleted successfully"
        })

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def createFinanceProductInfo(request):
    try:
        token = request.data.get("token")
        unique_id = request.data.get("unique_id")
        validity = request.data.get("validity")
        minimum_invest = request.data.get("minimum_invest")
        price = request.data.get("price")
        daily_income = request.data.get("daily_income")

        if not token or not unique_id or not minimum_invest or not validity or not price or not daily_income:
            return Response({"success": False, "message": "insufficient data"})

        number = getUserJWT(token)
        if not number:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        checkNumber = ownerNumber.objects.filter(numbers=number).first()

        if not checkNumber:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        user = User.objects.filter(mobile_number=number).first()

        if not user:
            return Response({"success": False, "message": "Invalid User"})

        sendData = ProductFinanceSchema(data=request.data)

        if sendData.is_valid(raise_exception=True):
            sendData.save()
            return Response({
                "success": True,
                "message": "Product created successfully"
            })
        else:
            return Response({
                "success":
                False,
                "message":
                "Invalid products details please try again"
            })

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def getFinanceProductInfo(request):
    try:
        token = request.data.get("token")
        unique_id = request.data.get("unique_id")

        if not token or not unique_id:
            return Response({"success": False, "message": "insufficient data"})

        number = getUserJWT(token)
        if not number:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        checkNumber = ownerNumber.objects.filter(numbers=number).first()

        if not checkNumber:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        user = User.objects.filter(mobile_number=number).first()

        if not user:
            return Response({"success": False, "message": "Invalid User"})

        products = ExcitelFinanceProducts.objects.filter(
            unique_id=unique_id).first()

        if not products:
            return Response({"success": False, "message": "Invalid product"})

        sendData = ProductFinanceSchema(products)

        return Response(sendData.data)

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["PATCH"])
@renderer_classes([JSONRenderer])
def updateFinanceProductInfo(request):
    try:
        token = request.data.get("token")
        unique_id = request.data.get("unique_id")
        validity = request.data.get("validity")
        minimum_invest = request.data.get("minimum_invest")
        price = request.data.get("price")
        daily_income = request.data.get("daily_income")

        if not token or not unique_id or not minimum_invest or not validity or not price or not daily_income:
            return Response({"success": False, "message": "insufficient data"})

        number = getUserJWT(token)
        if not number:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        checkNumber = ownerNumber.objects.filter(numbers=number).first()

        if not checkNumber:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        user = User.objects.filter(mobile_number=number).first()

        if not user:
            return Response({"success": False, "message": "Invalid User"})

        products = ExcitelFinanceProducts.objects.filter(
            unique_id=unique_id).first()

        if not products:
            return Response({"success": False, "message": "Invalid product"})

        sendData = ProductFinanceSchema(products, data=request.data)

        if sendData.is_valid():
            sendData.save()
            return Response({
                "success": True,
                "message": "Product updated successfully"
            })
        else:
            return Response({
                "success":
                False,
                "message":
                "Invalid products details please try again"
            })

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["DELETE"])
@renderer_classes([JSONRenderer])
def deleteFinanceProductInfo(request):
    try:
        token = request.data.get("token")
        unique_id = request.data.get("unique_id")

        if not token or not unique_id:
            return Response({"success": False, "message": "insufficient data"})

        number = getUserJWT(token)
        if not number:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        checkNumber = ownerNumber.objects.filter(numbers=number).first()

        if not checkNumber:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        user = User.objects.filter(mobile_number=number).first()

        if not user:
            return Response({"success": False, "message": "Invalid User"})

        products = ExcitelFinanceProducts.objects.filter(
            unique_id=unique_id).first()

        if not products:
            return Response({"success": False, "message": "Invalid product"})

        products.delete()

        return Response({
            "success": True,
            "message": "Product deleted successfully"
        })

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def createExtraDetails(request):
    try:
        token = request.data.get("token")
        minimum_withdraw = request.data.get("minimum_withdraw")
        minimum_recharge = request.data.get("minimum_recharge")
        tax_on_withdraw = request.data.get("tax_on_withdraw")
        recharge_channel1 = request.data.get("recharge_channel1")
        recharge_channel2 = request.data.get("recharge_channel2")
        recharge_channel3 = request.data.get("recharge_channel3")
        purchase_commissionLvl1 = request.data.get("purchase_commissionLvl1")
        purchase_commissionLvl2 = request.data.get("purchase_commissionLvl2")
        purchase_commissionLvl3 = request.data.get("purchase_commissionLvl3")
        is_upi = request.data.get("is_upi")

        if not token or not minimum_withdraw or not minimum_recharge or not tax_on_withdraw:
            return Response({"success": False, "message": "insufficient data"})

        number = getUserJWT(token)
        if not number:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        checkNumber = ownerNumber.objects.filter(numbers=number).first()

        if not checkNumber:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        user = User.objects.filter(mobile_number=number).first()

        if not user:
            return Response({"success": False, "message": "Invalid User"})

        extras = extraDetails.objects.all().first()
        if not extras:
            data = request.data
            saveExtraDetails = ExtraDetailsSchema(data=data)
            if saveExtraDetails.is_valid():
                saveExtraDetails.save()
                return Response({
                    "success": True,
                    "message": "Extra details created successFully"
                })

        data = request.data
        saveExtraDetails = ExtraDetailsSchema(extras, data=data, partial=True)
        if saveExtraDetails.is_valid():
            saveExtraDetails.save()
            return Response({
                "success": True,
                "message": "Extra details updated successFully"
            })

        return Response({
            "success":
            False,
            "message":
            "Invalid data please try again or refresh the page"
        })

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["GET"])
@renderer_classes([JSONRenderer])
def getExtraDetails(request):
    try:
        extras = extraDetails.objects.all().first()
        sendExtraDetails = ExtraDetailsSchema(extras)
        return Response(sendExtraDetails.data)

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def paymentCallBack(request):
    try:
        data = request.data

        if not data.get("order_id"):
            return Response(SERVER_ERROR)

        order_id = data.get("order_id")
        amt = data.get("amount")

        getTransDetails = Transactions.objects.filter(
            transactionId=order_id).first()

        if not getTransDetails:
            return Response({"success": False, "message": "Invalid order id"})

        getOrderAmount = getTransDetails.price

        if not int(amt) == int(getOrderAmount):
            return Response({"success": False, "message": "Invalid Amount"})

        getUser = User.objects.filter(
            mobile_number=getTransDetails.user.mobile_number).first()

        if not getUser:
            return Response({"success": False, "message": "User not found"})

        if not getTransDetails.is_done:
            return Response({
                "success": False,
                "message": "Payment already done"
            })

        dataForUser = {"balance": float(getUser.balance + int(amt))}
        dataForTrans = {"is_done": False}

        saveUserData = UserSchema(getUser, data=dataForUser, partial=True)
        saveTransData = ExcitelUserTransaction(getTransDetails,
                                               data=dataForTrans,
                                               partial=True)
        if saveUserData.is_valid():
            saveUserData.save()
            if saveTransData.is_valid():
                saveTransData.save()

        return Response({"success": True, "message": "Payment Done"})

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def getAllUser(request):
    try:
        token = request.data.get("token")

        if not token:
            return Response({"success": False, "message": "insufficient data"})

        number = getUserJWT(token)
        if not number:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        checkNumber = ownerNumber.objects.filter(numbers=number).first()

        if not checkNumber:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        user = User.objects.filter(mobile_number=number).first()

        if not user:
            return Response({"success": False, "message": "Invalid User"})

        user = User.objects.all()
        sendUserData = UserSchema(user, many=True)
        return Response(sendUserData.data)

    except Exception as e:
        return Response(SERVER_ERROR)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def getUser(request):
    try:
        token = request.data.get("token")
        number = request.data.get("number")

        if not token or not number:
            return Response({"success": False, "message": "insufficient data"})

        checkNom = getUserJWT(token)
        if not checkNom:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        checkNumber = ownerNumber.objects.filter(numbers=checkNom).first()

        if not checkNumber:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        user = User.objects.filter(mobile_number=number).first()

        if not user:
            return Response({"success": False, "message": "Invalid User"})

        user = User.objects.filter(mobile_number=number).first()

        if not user:
            return Response({"success": False, "message": "User not found"})

        sendUserData = UserSchema(user)

        return Response(sendUserData.data)

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def getWithdrawDetails(request):
    try:
        token = request.data.get("token")
        trid = request.data.get("trid")

        if not token or not trid:
            return Response({"success": False, "message": "insufficient data"})

        number = getUserJWT(token)
        if not number:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        checkNumber = ownerNumber.objects.filter(numbers=number).first()

        if not checkNumber:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        user = User.objects.filter(mobile_number=number).first()

        if not user:
            return Response({"success": False, "message": "Invalid User"})

        bankAccount = withdrawalRequest.objects.filter(
            transactionId=str(trid)).first()

        if not bankAccount:
            return Response({
                "success": False,
                "message": "Bank transaction not found"
            })

        sendUserData = ExcitelUserGetWithdrawalRequest(bankAccount)

        return Response(sendUserData.data)

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def blockUser(request):
    try:
        token = request.data.get("token")
        number = request.data.get("number")

        if not token or not number:
            return Response({"success": False, "message": "insufficient data"})

        number1 = getUserJWT(token)
        if not number1:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        checkNumber = ownerNumber.objects.filter(numbers=number1).first()

        if not checkNumber:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        user = User.objects.filter(mobile_number=number).first()

        if not user:
            return Response({"success": False, "message": "Invalid User"})

        user = User.objects.filter(mobile_number=number).first()

        if not user:
            return Response({"success": False, "message": "User not found"})

        sendUserData = UserSchema(user,
                                  data={"is_active": False},
                                  partial=True)

        if sendUserData.is_valid():
            sendUserData.save()
            return Response({
                "success": True,
                "message": "User blocked successfully"
            })

        return Response({
            "success": False,
            "message": "Server error please try again"
        })

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def unblockUser(request):
    try:
        token = request.data.get("token")
        number = request.data.get("number")

        if not token or not number:
            return Response({"success": False, "message": "insufficient data"})

        number1 = getUserJWT(token)
        if not number1:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        checkNumber = ownerNumber.objects.filter(numbers=number1).first()

        if not checkNumber:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        user = User.objects.filter(mobile_number=number).first()

        if not user:
            return Response({"success": False, "message": "Invalid User"})

        user = User.objects.filter(mobile_number=number).first()

        if not user:
            return Response({"success": False, "message": "User not found"})

        sendUserData = UserSchema(user,
                                  data={"is_active": True},
                                  partial=True)

        if sendUserData.is_valid():
            sendUserData.save()
            return Response({
                "success": True,
                "message": "User unblocked successfully"
            })

        return Response({
            "success": False,
            "message": "Server error please try again"
        })

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def getDepositDetails(request):
    try:
        token = request.data["token"]
        if not token:
            return Response({"success": False, "message": "insufficient data"})

        number = getUserJWT(token)
        if not number:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        user = User.objects.filter(mobile_number=number).first()

        if not user:
            return Response({"success": False, "message": "Invalid User"})

        checkNumber = ownerNumber.objects.filter(numbers=number).first()

        if not checkNumber:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        data = DepositMoney.objects.all()

        sendData = DepositSchema(data, many=True)
        return Response(sendData.data)

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def notification(request):
    try:
        token = request.data["token"]
        title = request.data["title"]
        msg = request.data["desc"]
        if not token:
            return Response({"success": False, "message": "insufficient data"})

        number = getUserJWT(token)
        if not number:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        user = User.objects.filter(mobile_number=number).first()
        if not user:
            return Response({"success": False, "message": "Invalid User"})

        checkNumber = ownerNumber.objects.filter(numbers=number).first()

        if not checkNumber:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        # save notification

        data = {"title": title, "desc": msg}

        saveData = NotificationSchema(data=data)

        if saveData.is_valid():
            saveData.save()

        return Response({
            "success": True,
            "message": "Message sent successfully"
        })

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def getnotification(request):
    try:
        # save notification

        dataop = Notification.objects.all().order_by('-id').first()

        saveData = NotificationSchema(dataop)

        return Response(saveData.data)

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)



@api_view(["GET"])
@renderer_classes([JSONRenderer])
def getTotalPay(request):
    try:
        # save notification

        dataop = TotalPay.objects.first()

        return Response({"amount": dataop})

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def getTransactions(request):
    try:
        # save notification

        token = request.data["token"]
        if not token:
            return Response({"success": False, "message": "insufficient data"})

        number = getUserJWT(token)
        if not number:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        user = User.objects.filter(mobile_number=number).first()
        if not user:
            return Response({"success": False, "message": "Invalid User"})

        checkNumber = ownerNumber.objects.filter(numbers=number).first()

        if not checkNumber:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        dataop = Transactions.objects.filter(
            title__contains="withdraw").all().order_by("-id")

        saveData = ExcitelUserTransaction(dataop, many=True)

        return Response(saveData.data)

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def getUserRefers(request):
    try:
        token = request.data["token"]
        userNumber = request.data["number"]
        if not token:
            return Response({"success": False, "message": "insufficient data"})

        number = getUserJWT(token)
        if not number:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        user = User.objects.filter(mobile_number=number).first()
        if not user:
            return Response({"success": False, "message": "Invalid User"})

        checkNumber = ownerNumber.objects.filter(numbers=number).first()

        if not checkNumber:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        user1 = User.objects.filter(mobile_number=userNumber).first()

        if not user1:
            return Response({"success": False, "message": "User not found"})

        referCode = user1.referId

        getUser = User.objects.filter(refer_by=referCode).all()

        sendAllRefer = UserSchema(getUser, many=True)
        return Response(sendAllRefer.data)

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def updateUsersTodayData(request):
    try:
        token = request.data.get("token")
        if not token:
            return Response({"success": False, "message": "insufficient data"})

        number = getUserJWT(token)
        if not number:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        user = User.objects.filter(mobile_number=number).first()
        if not user:
            return Response({"success": False, "message": "Invalid User"})

        checkNumber = ownerNumber.objects.filter(numbers=number).first()

        if not checkNumber:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        getAllUser = User.objects.all()

        for user in getAllUser:
            print("Starting...")
            productBalance = 0
            financeBalance = 0

            userProducts = UserProduct.objects.filter(User=user.id).all()
            userFinanceProduct = UserFinanceProduct.objects.filter(
                User=user.id).all()

            if userProducts:
                print("products...")
                for pr in userProducts:
                    if not checkExpireTime(pr.expire_on):
                        pr.delete()
                        continue

                    productBalance += pr.hourly_income

                productTransactionId = genRandomTransactionId()
                transData = {
                    "title": "Products income",
                    "catagory": "Hourly income",
                    "price": productBalance,
                    "up_or_down": "up",
                    "transactionId": productTransactionId,
                    "user": user.id,
                }
                userDetails = User.objects.filter(
                    mobile_number=user.mobile_number).first()
                saveUserProductData = UserSchema(
                    user,
                    data={
                        "today_earning":
                        userDetails.today_earning + productBalance,
                        "depositAmount": userDetails.depositAmount + productBalance
                    },
                    partial=True)

                if saveUserProductData.is_valid():
                    saveUserProductData.save()
                    saveTransData = ExcitelUserTransaction(data=transData)
                    if saveTransData.is_valid():
                        saveTransData.save()

            if userFinanceProduct:
                for userFinance in userFinanceProduct:
                    userDetails = User.objects.filter(
                        mobile_number=user.mobile_number).first()
                    if not checkExpireTime(userFinance.expire_on):
                        withdrawTax = userFinance.daily_income
                        amount = userFinance.user_invest
                        tax = (amount * withdrawTax) / 100
                        withDrawAmmount = amount + tax
                        dataForUser = {
                            "depositAmount":
                            userDetails.depositAmount + int(withDrawAmmount)
                        }
                        userInfo = UserSchema(userDetails,
                                              data=dataForUser,
                                              partial=True)
                        if userInfo.is_valid():
                            userInfo.save()
                            transactionId = genRandomTransactionId()
                            data = {
                                "title": f"Finance withdraw",
                                "catagory": "Finance withdraw",
                                "price": int(withDrawAmmount),
                                "up_or_down": "up",
                                "transactionId": transactionId,
                                "user": userDetails.id,
                            }
                            transactionDetails = ExcitelUserTransaction(
                                data=data)
                            if transactionDetails.is_valid():
                                transactionDetails.save()
                            userFinance.delete()

        return Response({"success": True, "message": "Updated successfully"})

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def resetTodayEarning(request):
    try:
        token = request.data.get("token")
        if not token:
            return Response({"success": False, "message": "insufficient data"})

        number = getUserJWT(token)
        if not number:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        user = User.objects.filter(mobile_number=number).first()
        if not user:
            return Response({"success": False, "message": "Invalid User"})

        checkNumber = ownerNumber.objects.filter(numbers=number).first()

        if not checkNumber:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        getAllUser = User.objects.all()

        for user in getAllUser:
            data = {"today_earning": 0}
            saveUserData = UserSchema(user, data=data, partial=True)
            if saveUserData.is_valid():
                saveUserData.save()
        return Response({"success": True, "message": "Reset successFully"})

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def getNumberToToken(request):
    try:
        token = request.data.get("token")
        number1 = request.data.get("number")
        if not token or not number1:
            return Response({"success": False, "message": "insufficient data"})

        number = getUserJWT(token)
        if not number:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        user = User.objects.filter(mobile_number=number).first()
        if not user:
            return Response({"success": False, "message": "Invalid User"})

        checkNumber = ownerNumber.objects.filter(numbers=number).first()

        if not checkNumber:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })
        sendData = User.objects.filter(mobile_number=number1, isFirstLogin="f")
        if not sendData:
            return Response({"success": False, "message": "User not active"})

        userToken = genJwtToken(int(number1))
        return Response({"success": True, "message": "Token found successfully", "token": userToken})
    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


# rattanindia update

@api_view(["POST"])
@renderer_classes([JSONRenderer])
def userDepositLifafa(request):
    try:
        token = request.data.get("token")
        number = request.data.get("number")
        amt = request.data.get("amt")

        if not token or not number:
            return Response({"success": False, "message": "insufficient data"})

        ownerNumberOP = getUserJWT(token)
        if not ownerNumber:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        checkNumber = ownerNumber.objects.filter(numbers=ownerNumberOP).first()

        if not checkNumber:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        user = User.objects.filter(mobile_number=number).first()

        if not user:
            return Response({"success": False, "message": "Invalid User"})

        userTotalBalance = int(amt) + int(user.depositAmount)

        data = {"depositAmount": userTotalBalance}
        userData = UserSchema(user, data=data, partial=True)

        if userData.is_valid():
            userData.save()
            transactionId = genRandomTransactionId()
            data = {
                "title": "Lifafa gift",
                "catagory": "Lifafa",
                "price": amt,
                "up_or_down": "up",
                "transactionId": transactionId,
                "user": user.id,
            }
            transactionDetails = ExcitelUserTransaction(data=data)
            if transactionDetails.is_valid():
                transactionDetails.save()
                return Response({
                    "success": True,
                    "message": "LIFAFA ACTIVATED SUCCESSFULLY"
                })

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)
