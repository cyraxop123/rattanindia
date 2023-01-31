from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer

# IMPORT MODELS
from excitelapi.models import User, extraDetails
from excitelapi.serializers import ExcitelUserTransaction, UserSchema
from excitelapi.utils.JWT_utlis import genJwtToken, getAuthDetails
from excitelapi.utils.Transaction import genRandomTransactionId
from excitelapi.utils.getReferId import GenRandomId
from excitelapi.utils.otp_utils import checkOTP, sendOtp

SERVER_ERROR = {"success": False, "message": "Server Error"}


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def login(request):
    try:
        encData = request.data.get("data")
        data = getAuthDetails(encData)
        if not data:
            return Response({"success": False, "message": "Invalid token"})
        number = data.get("number")
        password = data.get("password")
        if not number or not password:
            return Response({"success": False, "message": "insufficient data"})
        # PURIFY INPUTS
        number = int(number)
        password = str(password)

        # GET USER DATA FROM DATABASE
        userData = User.objects.filter(mobile_number=number).first()

        # CHECK USER PASSWORD AND NUMBER
        if not userData:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        if not userData.is_active:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        if not userData.password == password:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        if userData.isFirstLogin == "t":
            if not userData.refer_by:
                getBonus = extraDetails.objects.first().bonus
                activeData = {"isFirstLogin": "f", "balance": getBonus}
                saveactiveData = UserSchema(userData,
                                            data=activeData,
                                            partial=True)
                if saveactiveData.is_valid():
                    saveactiveData.save()
                    data = {
                        "title": "joining bonus",
                        "catagory": "Joining bonus",
                        "price": getBonus,
                        "up_or_down": "up",
                        "transactionId": transactionId,
                        "user": userData.id,
                    }
                    transactionDetails = ExcitelUserTransaction(data=data)
                    if transactionDetails.is_valid(raise_exception=True):
                        transactionDetails.save()
                        token = genJwtToken(int(userData.mobile_number))
                        return Response({
                            "success": True,
                            "message": "login success",
                            "token": token
                        })
            getUserReferId = User.objects.filter(
                referId=userData.refer_by).first()

            getReferAmount = extraDetails.objects.first().purchase_commissionLvl1
            getBonus = extraDetails.objects.first().bonus
            transactionId = genRandomTransactionId()
            data = {
                "title": "Refer joining bonus",
                "catagory": "Refer and earn",
                "price": getReferAmount,
                "up_or_down": "up",
                "transactionId": transactionId,
                "user": getUserReferId.id,
            }
            transactionDetails = ExcitelUserTransaction(data=data)
            if transactionDetails.is_valid(raise_exception=True):
                transactionDetails.save()
                userReferAmount = {
                    "balance": int(getUserReferId.balance + getReferAmount)
                }
                updateUserBalance = UserSchema(getUserReferId,
                                               data=userReferAmount,
                                               partial=True)
                if updateUserBalance.is_valid():
                    updateUserBalance.save()
                    token = genJwtToken(int(userData.mobile_number))
                    activeData = {"isFirstLogin": "f", "balance": getBonus}
                    saveactiveData = UserSchema(userData,
                                                data=activeData,
                                                partial=True)
                    if saveactiveData.is_valid():
                        saveactiveData.save()
                        if saveactiveData.is_valid():
                            saveactiveData.save()
                            data = {
                                "title": "joining bonus",
                                "catagory": "Joining bonus",
                                "price": getBonus,
                                "up_or_down": "up",
                                "transactionId": transactionId,
                                "user": userData.id,
                            }
                            transactionDetails = ExcitelUserTransaction(
                                data=data)
                            if transactionDetails.is_valid(raise_exception=True):
                                transactionDetails.save()
                                token = genJwtToken(
                                    int(userData.mobile_number))
                                return Response({
                                    "success": True,
                                    "message": "login success",
                                    "token": token
                                })
        token = genJwtToken(int(userData.mobile_number))
        return Response({
            "success": True,
            "message": "login success",
            "token": token
        })

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def signup(request):
    try:
        encData = request.data.get("data")
        data = getAuthDetails(encData)
        if not data:
            return Response({"success": False, "message": "Invalid token"})
        number = data.get("number")
        password = data.get("password")
        name = data.get("name")
        referId = data.get("referId")

        # VALIDATE INPUTS
        if not number or not password or not name:
            return Response({"success": False, "message": "insufficient data"})

        if not len(str(number)) == 10:
            return Response({
                "success": False,
                "message": "Invalid Mobile Number"
            })

        # PURIFY INPUTS
        number = int(number)
        password = str(password)
        name = str(name)

        # CHECK USER
        users = User.objects.all()
        for i in users:
            if number == i.mobile_number:
                if i.is_active:
                    return Response({
                        "success": False,
                        "message": "Number already present"
                    })
                i.delete()

        # CREATE DATA
        if not referId:
            referId = GenRandomId()
            data = {
                "name": name,
                "mobile_number": number,
                "password": password,
                "referId": referId,
            }
            userData = UserSchema(data=data)
            if userData.is_valid():
                if not sendOtp(number):
                    return Response({
                        "success":
                        False,
                        "message":
                        "Server Timeout please try again"
                    })
                userData.save()
                return Response({
                    "success": True,
                    "message": "Otp sent successfully"
                })

        randomReferId = GenRandomId()

        # CHECK REFER ID
        referID = User.objects.filter(referId=referId).first()
        if not referID:
            return Response({"success": False, "message": "Invalid refer id"})

        data = {
            "name": name,
            "mobile_number": number,
            "password": password,
            "referId": randomReferId,
            "refer_by": referID.referId,
        }
        userData = UserSchema(data=data)
        if userData.is_valid():
            if not sendOtp(number):
                return Response({
                    "success": False,
                    "message": "Server Timeout please try again"
                })
            userData.save()
            return Response({
                "success": True,
                "message": "Otp sent successfully"
            })

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def verifyAccount(request):
    try:
        data = request.data
        number = data.get("number")
        otp = data.get("OTP")
        if not otp or not number:
            return Response({"success": False, "message": "insufficient data"})

        user = User.objects.filter(mobile_number=int(number)).first()

        if not user:
            return Response({"success": False, "message": "User not found"})

        data = {"is_active": True}
        if user.is_active:
            return Response({
                "success":
                False,
                "message":
                "Account already active please login to continue"
            })

        userData = UserSchema(user, data=data, partial=True)
        if not checkOTP(number, otp):
            return Response({"success": False, "message": "Invalid OTP"})

        if userData.is_valid():
            userData.save()
            return Response({
                "success": True,
                "message": "User registerd successfully"
            })
        else:
            return Response({
                "success": False,
                "message": "Server error please try again"
            })

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def forgetPassword(request):
    try:
        data = request.data
        number = data.get("number")

        if not number:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        user = User.objects.filter(mobile_number=int(number)).first()

        if not user:
            return Response({"success": False, "message": "User not found"})

        if not sendOtp(number):
            return Response({
                "success": False,
                "message": "Server Timeout please try again"
            })

        return Response({"success": True, "message": "OTP send successfully"})

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def verifyForgetOTP(request):
    try:
        data = request.data
        password = data.get("password")
        number = data.get("number")
        otp = data.get("OTP")
        if not otp or not number or not password:
            return Response({"success": False, "message": "insufficient data"})

        user = User.objects.filter(mobile_number=int(number)).first()

        if not user:
            return Response({"success": False, "message": "User not found"})

        if not checkOTP(number, otp):
            return Response({"success": False, "message": "Invalid OTP"})

        data = {"password": password}
        userData = UserSchema(user, data=data, partial=True)
        if userData.is_valid():
            userData.save()
            return Response({
                "success": True,
                "message": "User password reset successfully"
            })
        else:
            return Response({
                "success": False,
                "message": "Server error please try again"
            })

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)
