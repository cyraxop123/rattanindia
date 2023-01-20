from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from excitelapi.models import (
    BankAccount,
    ExcitelFinanceProducts,
    ExcitelProducts,
    Lifafa,
    Transactions,
    User,
    UserFinanceProduct,
    UserProduct,
    extraDetails,
    withdrawalRequest,
)
from excitelapi.serializers import (
    BankAccountSchema, DepositSchema, ExcitelLifafa,
    ExcitelUserFinanceProductSchema, ExcitelUserFinanceProductSendSchema,
    ExcitelUserGetWithdrawalRequest, ExcitelUserProductSchema,
    ExcitelUserProductSendSchema, ExcitelUserTransaction,
    ExcitelUserWithdrawalRequest, ProductFinanceSchema, UserSchema,
    ProductSchema)

from excitelapi.utils.JWT_utlis import getUserJWT
from excitelapi.utils.Transaction import genRandomTransactionId
from excitelapi.utils.TimeAndDate import getExpireTime, checkExpireTime

# Create your views here.

SERVER_ERROR = {"success": False, "message": "Server Error"}


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def getBankDetails(request):
    try:
        data = request.data
        token = data.get("token")
        if not token:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })
        number = getUserJWT(token)
        if not number:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        userData = User.objects.filter(mobile_number=number).first()

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

        userBank = BankAccount.objects.filter(User=userData.id).all()
        if not userBank:
            return Response({
                "success": False,
                "message": "You dont have any back account linked"
            })

        bank = BankAccountSchema(userBank, many=True)

        return Response({"data": bank.data})

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["PATCH"])
@renderer_classes([JSONRenderer])
def updateBankDetails(request):
    try:
        data = request.data
        token = data.get("token")
        accountNumber = data.get("accountNumber")
        is_primary = data.get("is_primary")

        if not token:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        if (not accountNumber or not is_primary):
            return Response({"success": False, "message": "insufficient data"})

        number = getUserJWT(token)
        if not number:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        userData = User.objects.filter(mobile_number=number).first()

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

        userBank = BankAccount.objects.filter(
            User=userData.id, accountNumber=accountNumber).first()
        if not userBank:
            return Response({"success": False, "message": "Bank not found"})

        checkUpi = extraDetails.objects.all().first()
        if checkUpi.is_upi:
            data = {'primaryBank': True if is_primary else False}
            bank = BankAccountSchema(userBank, data=data, partial=True)
            if bank.is_valid():
                bank.save()
                getUserBanks = BankAccount.objects.filter(
                    User=userData.id).all()
                for i in getUserBanks:
                    if not i.accountNumber == accountNumber:
                        data = {'primaryBank': False}
                        bank = BankAccountSchema(i, data=data, partial=True)
                        if bank.is_valid():
                            bank.save()

                return Response({
                    "success": True,
                    "message": "Bank Account updated successfully"
                })
            else:
                return Response({"success": False, "message": "Invalid Data"})

        data = {'primaryBank': True if is_primary else False}
        bank = BankAccountSchema(userBank, data=data, partial=True)
        if bank.is_valid():
            bank.save()
            getUserBanks = BankAccount.objects.filter(User=userData.id).all()
            for i in getUserBanks:
                if not i.accountNumber == accountNumber:
                    data = {'primaryBank': False}
                    bank = BankAccountSchema(i, data=data, partial=True)
                    if bank.is_valid():
                        bank.save()
            return Response({
                "success": True,
                "message": "Bank Account updated successfully"
            })
        else:
            return Response({"success": False, "message": "Invalid Data"})

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def BindBankDetails(request):
    try:
        data = request.data
        token = data.get("token")
        holderName = data.get("holdername")
        accountNumber = data.get("accountNumber")
        IFSC = data.get("IFSC")
        bankAccountName = data.get("bankAccountName")
        upiId = data.get("upiId")

        if not token:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        if (not holderName or not accountNumber or not IFSC
                or not bankAccountName):
            return Response({"success": False, "message": "insufficient data"})

        number = getUserJWT(token)
        if not number:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        userData = User.objects.filter(mobile_number=number).first()

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

        isBankPrimary = False

        checkBank = BankAccount.objects.filter(User=userData.id).all()
        if len(checkBank) <= 0:
            isBankPrimary = True

        checkUpi = extraDetails.objects.all().first()
        if checkUpi.is_upi:
            if not data.get("upiId"):
                return Response({
                    "success": False,
                    "message": "Please Enter your upi id"
                })
            data = {
                "holderName": holderName,
                "accountNumber": accountNumber,
                "IFSC": IFSC,
                "bankAccountName": bankAccountName,
                "upiId": upiId,
                "User": userData.id,
                'primaryBank': True if isBankPrimary else False
            }
            bank = BankAccountSchema(data=data, partial=True)
            if bank.is_valid():
                bank.save()
                return Response({
                    "success": True,
                    "message": "Bank Account bind successfully"
                })
            else:
                return Response({"success": False, "message": "Invalid Data"})

        data = {
            "holderName": holderName,
            "accountNumber": accountNumber,
            "IFSC": IFSC,
            "bankAccountName": bankAccountName,
            "User": userData.id,
            'primaryBank': True if isBankPrimary else False
        }
        bank = BankAccountSchema(data=data, partial=True)
        if bank.is_valid():
            bank.save()
            return Response({
                "success": True,
                "message": "Bank Account created successfully"
            })
        else:
            return Response({"success": False, "message": "Invalid Data"})

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["POST"])
# @renderer_classes([JSONRenderer])
def buyExcitelPRoduct(request):
    try:
        data = request.data
        token = data.get("token")
        unique_id = data.get("unique_id")

        if not token or not unique_id:
            return Response({"success": False, "message": "insufficient data"})

        number = getUserJWT(token)
        if not number:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        products = ExcitelProducts.objects.filter(unique_id=unique_id).first()

        if not products:
            return Response({"success": False, "message": "Invalid Product"})

        productPrice = products.price

        userData = User.objects.filter(mobile_number=number).first()

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

        userBalance = userData.balance

        if int(productPrice) > int(userBalance):
            return Response({
                "success": False,
                "message": "Insufficient funds"
            })

        expireTime = getExpireTime(int(products.validity))
        data = {
            "title": products.title,
            "unique_id": products.unique_id,
            "User": userData.id,
            "validity": products.validity,
            "price": products.price,
            "hourly_income": products.hourly_income,
            "image_url": products.image_url,
            "expire_on": expireTime
        }
        userData = ExcitelUserProductSchema(data=data)
        if userData.is_valid():
            userData1 = User.objects.filter(mobile_number=number).first()
            userSaveBalance = UserSchema(
                userData1,
                data={
                    "balance": int(int(userData1.balance - int(productPrice)))
                },
                partial=True,
            )
            if userSaveBalance.is_valid():
                userSaveBalance.save()
                userData.save()
                dataForProduct = {"total_sell": products.total_sell + 1}
                updateProductData = ProductSchema(products,
                                                  data=dataForProduct,
                                                  partial=True)
                if updateProductData.is_valid():
                    updateProductData.save()

                transactionId = genRandomTransactionId()
                data = {
                    "title": products.title,
                    "catagory": "Excitel Product",
                    "price": products.price,
                    "up_or_down": "down",
                    "transactionId": transactionId,
                    "user": userData1.id,
                }
                transactionDetails = ExcitelUserTransaction(data=data)
                if transactionDetails.is_valid():
                    transactionDetails.save()

                    getUserDetails = User.objects.filter(
                        mobile_number=number).first()

                    if not getUserDetails.refer_by:
                        return Response({
                            "success": True,
                            "message": "Check Your cart"
                        })

                    getReferProfit = extraDetails.objects.first()

                    level1Profit = getReferProfit.purchase_commissionLvl1
                    level2Profit = getReferProfit.purchase_commissionLvl2
                    level3Profit = getReferProfit.purchase_commissionLvl3

                    findLevel1User = User.objects.filter(
                        referId=getUserDetails.refer_by).first()

                    if not findLevel1User:
                        return Response({
                            "success": True,
                            "message": "Check Your cart"
                        })

                    saveRefer1Profit = UserSchema(
                        findLevel1User,
                        data={
                            "balance":
                            float(findLevel1User.balance + int(level1Profit))
                        },
                        partial=True)

                    if saveRefer1Profit.is_valid():
                        saveRefer1Profit.save()
                        transactionId = genRandomTransactionId()
                        data = {
                            "title": "Level 1 Refer",
                            "catagory": "Refer And Earn",
                            "price": int(level1Profit),
                            "up_or_down": "up",
                            "transactionId": transactionId,
                            "user": findLevel1User.id,
                        }
                        transactionDetails = ExcitelUserTransaction(data=data)
                        if transactionDetails.is_valid():
                            transactionDetails.save()
                        if not findLevel1User.refer_by:
                            return Response({
                                "success": True,
                                "message": "Check Your cart"
                            })

                    else:
                        return Response({
                            "success": True,
                            "message": "Check Your cart"
                        })

                    # FIND 2 LEVEL REFER

                    findLevel2User = User.objects.filter(
                        referId=findLevel1User.refer_by).first()

                    if not findLevel2User:
                        return Response({
                            "success": True,
                            "message": "Check Your cart"
                        })

                    saveRefer2Profit = UserSchema(
                        findLevel2User,
                        data={
                            "balance":
                            float(findLevel2User.balance + int(level2Profit))
                        },
                        partial=True)

                    if saveRefer2Profit.is_valid():
                        saveRefer2Profit.save()
                        transactionId = genRandomTransactionId()
                        data = {
                            "title": "Level 2 Refer",
                            "catagory": "Refer And Earn",
                            "price": int(level2Profit),
                            "up_or_down": "up",
                            "transactionId": transactionId,
                            "user": findLevel2User.id,
                        }
                        transactionDetails = ExcitelUserTransaction(data=data)
                        if transactionDetails.is_valid():
                            transactionDetails.save()
                        if not findLevel2User.refer_by:
                            return Response({
                                "success": True,
                                "message": "Check Your cart"
                            })

                    else:
                        return Response({
                            "success": True,
                            "message": "Check Your cart"
                        })

                    # FIND 3 LEVEL REFER

                    findLevel3User = User.objects.filter(
                        referId=findLevel2User.refer_by).first()

                    if not findLevel3User:
                        return Response({
                            "success": True,
                            "message": "Check Your cart"
                        })

                    saveRefer3Profit = UserSchema(
                        findLevel3User,
                        data={
                            "balance":
                            float(findLevel3User.balance + int(level3Profit))
                        },
                        partial=True)

                    if saveRefer3Profit.is_valid():
                        saveRefer3Profit.save()
                        transactionId = genRandomTransactionId()
                        data = {
                            "title": "Level 3 Refer",
                            "catagory": "Refer And Earn",
                            "price": int(level3Profit),
                            "up_or_down": "up",
                            "transactionId": transactionId,
                            "user": findLevel3User.id,
                        }
                        transactionDetails = ExcitelUserTransaction(data=data)
                        if transactionDetails.is_valid():
                            transactionDetails.save()
                    else:
                        return Response({
                            "success": True,
                            "message": "Check Your cart"
                        })

                    return Response({
                        "success": True,
                        "message": "Check Your cart"
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
def buyExcitelFinanceProduct(request):
    try:
        data = request.data
        token = data.get("token")
        unique_id = data.get("unique_id")
        amt = data.get("amt")

        if not token or not unique_id or not amt:
            return Response({"success": False, "message": "insufficient data"})

        number = getUserJWT(token)
        if not number:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        if int(amt) <= 0:
            return Response({"success": False, "message": "Invalid price"})

        products = ExcitelFinanceProducts.objects.filter(
            unique_id=unique_id).first()

        if not products:
            return Response({"success": False, "message": "Invalid Product"})

        productPrice = products.price

        if int(amt) < products.minimum_invest:
            return Response({
                "success":
                False,
                "message":
                f"minimum amount should be {products.minimum_invest}"
            })

        userData = User.objects.filter(mobile_number=number).first()

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

        userBalance = userData.balance

        if int(amt) > int(userBalance):
            return Response({
                "success": False,
                "message": "Insufficient funds"
            })

        expireOn = getExpireTime(products.validity)

        data = {
            "User": userData.id,
            "unique_id": products.unique_id,
            "validity": products.validity,
            "daily_income": products.daily_income,
            "price": products.price,
            "expire_on": expireOn,
            "user_invest": int(amt),
            "minimum_invest": products.minimum_invest
        }
        userData = ExcitelUserFinanceProductSchema(data=data)
        if userData.is_valid():
            userData1 = User.objects.filter(mobile_number=number).first()
            userSaveBalance = UserSchema(
                userData1,
                data={"balance": int(int(userData1.balance - int(amt)))},
                partial=True,
            )
            if userSaveBalance.is_valid():
                userSaveBalance.save()
                userData.save()
                dataForProduct = {"total_sell": products.total_sell + 1}
                updateProductData = ProductSchema(products,
                                                  data=dataForProduct,
                                                  partial=True)
                if updateProductData.is_valid():
                    updateProductData.save()
                transactionId = genRandomTransactionId()
                data = {
                    "title": "Finance Product",
                    "catagory": "Finance Product",
                    "price": amt,
                    "up_or_down": "down",
                    "transactionId": transactionId,
                    "user": userData1.id,
                }
                transactionDetails = ExcitelUserTransaction(data=data)
                if transactionDetails.is_valid():
                    transactionDetails.save()
                    getUserDetails = User.objects.filter(
                        mobile_number=number).first()

                    if not getUserDetails.refer_by:
                        return Response({
                            "success": True,
                            "message": "Check Your cart"
                        })

                    getReferProfit = extraDetails.objects.first()

                    level1Profit = getReferProfit.purchase_commissionLvl1
                    level2Profit = getReferProfit.purchase_commissionLvl2
                    level3Profit = getReferProfit.purchase_commissionLvl3

                    findLevel1User = User.objects.filter(
                        referId=getUserDetails.refer_by).first()

                    if not findLevel1User:
                        return Response({
                            "success": True,
                            "message": "Check Your cart"
                        })

                    saveRefer1Profit = UserSchema(
                        findLevel1User,
                        data={
                            "balance":
                            float(findLevel1User.balance + int(level1Profit))
                        },
                        partial=True)

                    if saveRefer1Profit.is_valid():
                        saveRefer1Profit.save()
                        transactionId = genRandomTransactionId()
                        data = {
                            "title": "Level 1 Refer",
                            "catagory": "Refer And Earn",
                            "price": int(level1Profit),
                            "up_or_down": "up",
                            "transactionId": transactionId,
                            "user": findLevel1User.id,
                        }
                        transactionDetails = ExcitelUserTransaction(data=data)
                        if transactionDetails.is_valid():
                            transactionDetails.save()
                        if not findLevel1User.refer_by:
                            return Response({
                                "success": True,
                                "message": "Check Your cart"
                            })

                    else:
                        return Response({
                            "success": True,
                            "message": "Check Your cart"
                        })

                    # FIND 2 LEVEL REFER

                    findLevel2User = User.objects.filter(
                        referId=findLevel1User.refer_by).first()

                    if not findLevel2User:
                        return Response({
                            "success": True,
                            "message": "Check Your cart"
                        })

                    saveRefer2Profit = UserSchema(
                        findLevel2User,
                        data={
                            "balance":
                            float(findLevel2User.balance + int(level2Profit))
                        },
                        partial=True)

                    if saveRefer2Profit.is_valid():
                        saveRefer2Profit.save()
                        transactionId = genRandomTransactionId()
                        data = {
                            "title": "Level 2 Refer",
                            "catagory": "Refer And Earn",
                            "price": int(level2Profit),
                            "up_or_down": "up",
                            "transactionId": transactionId,
                            "user": findLevel2User.id,
                        }
                        transactionDetails = ExcitelUserTransaction(data=data)
                        if transactionDetails.is_valid():
                            transactionDetails.save()
                        if not findLevel2User.refer_by:
                            return Response({
                                "success": True,
                                "message": "Check Your cart"
                            })

                    else:
                        return Response({
                            "success": True,
                            "message": "Check Your cart"
                        })

                    # FIND 3 LEVEL REFER

                    findLevel3User = User.objects.filter(
                        referId=findLevel2User.refer_by).first()

                    if not findLevel3User:
                        return Response({
                            "success": True,
                            "message": "Check Your cart"
                        })

                    saveRefer3Profit = UserSchema(
                        findLevel3User,
                        data={
                            "balance":
                            float(findLevel3User.balance + int(level3Profit))
                        },
                        partial=True)

                    if saveRefer3Profit.is_valid():
                        saveRefer3Profit.save()
                        transactionId = genRandomTransactionId()
                        data = {
                            "title": "Level 3 Refer",
                            "catagory": "Refer And Earn",
                            "price": int(level3Profit),
                            "up_or_down": "up",
                            "transactionId": transactionId,
                            "user": findLevel3User.id,
                        }
                        transactionDetails = ExcitelUserTransaction(data=data)
                        if transactionDetails.is_valid():
                            transactionDetails.save()
                    else:
                        return Response({
                            "success": True,
                            "message": "Check Your cart"
                        })

                    return Response({
                        "success": True,
                        "message": "Check Your cart"
                    })
        else:
            return Response({
                "success": False,
                "message": "Server error please try again"
            })

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["DELETE"])
@renderer_classes([JSONRenderer])
def userDeleteFinanceProduct(request):
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

        userData = User.objects.filter(mobile_number=number).first()
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
        products = UserFinanceProduct.objects.filter(
            unique_id=unique_id).first()

        if not products:
            return Response({"success": False, "message": "Invalid product"})

        expireTime = products.expire_on

        if checkExpireTime(expireTime):
            withdrawTax = extraDetails.objects.first().tax_on_withdraw
            amount = products.user_invest
            tax = (amount * withdrawTax) / 100
            withDrawAmmount = amount - tax
            dataForUser = {"balance": userData.balance + int(withDrawAmmount)}
            userInfo = UserSchema(userData, data=dataForUser, partial=True)
            if userInfo.is_valid():
                userInfo.save()
                transactionId = genRandomTransactionId()
                data = {
                    "title": f"Finance withdraw ({withdrawTax}%)",
                    "catagory": "Finance withdraw",
                    "price": int(withDrawAmmount),
                    "up_or_down": "up",
                    "transactionId": transactionId,
                    "user": userData.id,
                }
                transactionDetails = ExcitelUserTransaction(data=data)
                if transactionDetails.is_valid(raise_exception=True):
                    transactionDetails.save()
                products.delete()
                return Response({
                    "success": True,
                    "message": "Product deleted successfully"
                })

        withdrawTax = products.daily_income
        amount = products.user_invest
        tax = (amount * withdrawTax) / 100
        withDrawAmmount = amount + tax
        dataForUser = {"balance": userData.balance + int(withDrawAmmount)}
        userInfo = UserSchema(userData, data=dataForUser, partial=True)
        if userInfo.is_valid():
            userInfo.save()
            transactionId = genRandomTransactionId()
            data = {
                "title": f"Finance withdraw",
                "catagory": "Finance withdraw",
                "price": int(withDrawAmmount),
                "up_or_down": "up",
                "transactionId": transactionId,
                "user": userData.id,
            }
            transactionDetails = ExcitelUserTransaction(data=data)
            if transactionDetails.is_valid(raise_exception=True):
                transactionDetails.save()
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
def sendUserInfo(request):
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

        if not user.is_active:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        sendUserData = UserSchema(user)
        return Response(sendUserData.data)

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def sendUserTransaction(request):
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

        if not user.is_active:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        trans = Transactions.objects.filter(user=user.id).all().order_by("-id")
        userTransaction = ExcitelUserTransaction(trans, many=True)
        return Response(userTransaction.data)
    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def submitWithDrawalRequest(request):
    try:
        token = request.data.get("token")
        amount = request.data.get("amount")
        if not token or not amount:
            return Response({"success": False, "message": "insufficient data"})

        if int(amount) <= 0:
            return Response({"success": False, "message": "Invlaid"})

        number = getUserJWT(token)
        if not number:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        user = User.objects.filter(mobile_number=number).first()

        if not user:
            return Response({"success": False, "message": "Invalid User"})

        if not user.is_active:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        if int(user.depositAmount) < int(amount):
            return Response({
                "success": False,
                "message": "Insufficient funds"
            })

        getBankDetails = BankAccount.objects.filter(User=user.id).first()

        if not getBankDetails:
            return Response({
                "success": False,
                "message": "Please Bind Your Bank Account"
            })

        getExrta = extraDetails.objects.all().first()
        transactionId = genRandomTransactionId()
        data = {}
        if getExrta.is_upi:
            data = {
                "User": user.id,
                "Bank": getBankDetails.id,
                "money": amount,
                "transactionId": transactionId,
                "is_upi": True
            }
            userWithdrawalRequest = ExcitelUserWithdrawalRequest(data=data)
            if userWithdrawalRequest.is_valid():
                userWithdrawalRequest.save()
                transactionId = genRandomTransactionId()
                data = {
                    "title": "Withdraw Money",
                    "catagory": "Withdraw money",
                    "price": amount,
                    "up_or_down": "down",
                    "transactionId": transactionId,
                    "user": user.id,
                }
                transactionDetails = ExcitelUserTransaction(data=data)
                if transactionDetails.is_valid():
                    transactionDetails.save()
                    userDataBalance = UserSchema(
                        user,
                        data={"depositAmount": int(
                            user.depositAmount - int(amount))},
                        partial=True)
                    if userDataBalance.is_valid():
                        userDataBalance.save()
                        return Response({
                            "success":
                            True,
                            "message":
                            "withdrawal requested successfully"
                        })

        data = {
            "User": user.id,
            "Bank": getBankDetails.id,
            "money": amount,
            "transactionId": transactionId,
            "is_upi": False
        }

        userWithdrawalRequest = ExcitelUserWithdrawalRequest(data=data)

        if userWithdrawalRequest.is_valid():
            userWithdrawalRequest.save()
            transactionId = genRandomTransactionId()
            data = {
                "title": "Withdraw Money",
                "catagory": "Withdraw money",
                "price": amount,
                "up_or_down": "down",
                "transactionId": transactionId,
                "user": user.id,
            }
            transactionDetails = ExcitelUserTransaction(data=data)
            if transactionDetails.is_valid():
                transactionDetails.save()
                userDataBalance = UserSchema(
                    user,
                    data={"depositAmount": int(
                        user.depositAmount - int(amount))},
                    partial=True)
                if userDataBalance.is_valid():
                    userDataBalance.save()
                return Response({
                    "success": True,
                    "message": "withdrawal requested successfully"
                })

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def getUserWithdrawalRequest(request):
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

        if not user.is_active:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        bankLogs = withdrawalRequest.objects.filter(
            User=user.id).all().order_by("-id")

        if len(bankLogs) <= 0:
            return Response({
                "success":
                False,
                "message":
                "you dont have any bank withdrawal requests",
            })

        sendBankLogs = ExcitelUserGetWithdrawalRequest(bankLogs, many=True)
        return Response(sendBankLogs.data)

    except Exception as e:
        return Response(SERVER_ERROR)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def checkAndDepositLifafa(request):
    try:
        token = request.data.get("token")
        lifafa = request.data.get("lifafa")
        if not token or not lifafa:
            return Response({"success": False, "message": "insufficient data"})

        number = getUserJWT(token)
        if not number:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        user = User.objects.filter(mobile_number=number).first()

        if not user.is_active:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

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

        userTotalBalance = int(lifafaCode.amount) + int(user.depositAmount)

        data = {"depositAmount": userTotalBalance}
        userData = UserSchema(user, data=data, partial=True)

        if userData.is_valid():
            userData.save()
            lifafa = ExcitelLifafa(lifafaCode,
                                   data={"is_active": True},
                                   partial=True)
            if lifafa.is_valid():
                transactionId = genRandomTransactionId()
                data = {
                    "title": "Lifafa gift",
                    "catagory": "Lifafa",
                    "price": lifafaCode.amount,
                    "up_or_down": "up",
                    "transactionId": transactionId,
                    "user": user.id,
                }
            transactionDetails = ExcitelUserTransaction(data=data)
            if transactionDetails.is_valid():
                transactionDetails.save()
                lifafa.save()
                return Response({
                    "success": True,
                    "message": "LIFAFA ACTIVATED SUCCESSFULLY"
                })

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def getUserFinanceProduct(request):
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

        if not user.is_active:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        products = UserFinanceProduct.objects.filter(
            User=user.id).all().order_by("-id")
        sendData = ExcitelUserFinanceProductSendSchema(products, many=True)
        return Response(sendData.data)
    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def getUserProduct(request):
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

        if not user.is_active:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        products = UserProduct.objects.filter(
            User=user.id).all().order_by("-id")
        sendData = ExcitelUserProductSendSchema(products, many=True)
        return Response(sendData.data)
    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def createDepositRequest(request):
    try:
        token = request.data.get("token")
        amt = request.data.get("amt")
        channel = request.data.get("channel")
        if not token or not amt or not channel:
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

        if not user.is_active:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })
        transactionIdop = genRandomTransactionId()
        data = {
            "status": "Pending",
            "amount": amt,
            "trid": transactionIdop,
            "User": user.id,
            "channel": channel
        }

        depositeMoneyData = DepositSchema(data=data, partial=True)

        if depositeMoneyData.is_valid():
            transactionId = genRandomTransactionId()
            data = {
                "title": "Deposit money",
                "catagory": "Deposit money",
                "price": amt,
                "up_or_down": "up",
                "transactionId": transactionId,
                "user": user.id,
                "is_done": True
            }
            transactionDetails = ExcitelUserTransaction(data=data)
            if transactionDetails.is_valid():
                transactionDetails.save()
                depositeMoneyData.save()
                return Response({
                    "success": True,
                    "message": "Deposit requested successfully",
                    "id": transactionId
                })

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def getAllUserRefer(request):
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

        if not user.is_active:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        referID = user.referId

        getAllUser = User.objects.filter(refer_by=referID).all()

        return Response({"users": len(getAllUser)})

    except Exception as e:
        return Response(SERVER_ERROR)


@api_view(["POST"])
@renderer_classes([JSONRenderer])
def getAllUserReferWithLevel(request):
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

        if not user.is_active:
            return Response({
                "success": False,
                "message": "Invalid credentials"
            })

        referID = user.referId

        getAllUser = User.objects.filter(refer_by=referID).all().order_by("-id")

        level1Users = []
        level2Users = []
        level3Users = []

        finalList = []

        for i in getAllUser:
            level1Users.append({
                "name": i.name,
                "number": i.mobile_number,
                "joinon": i.timestamp,
                "level": 1,
                "referId": i.referId
            })

        for i in level1Users:
            level2 = User.objects.filter(refer_by=i["referId"]).all().order_by("-id")
            for i in level2:
                level2Users.append({
                "name": i.name,
                "number": i.mobile_number,
                "joinon": i.timestamp,
                "level": 2,
                "referId": i.referId
            })

        for i in level2Users:
            level3 = User.objects.filter(refer_by=i["referId"]).all().order_by("-id")
            for i in level3:
                level3Users.append({
                "name": i.name,
                "number": i.mobile_number,
                "joinon": i.timestamp,
                "level": 3,
                "referId": i.referId
            })
        
        finalList.extend(level1Users)
        finalList.extend(level2Users)
        finalList.extend(level3Users)


            
        print(level1Users)
        print()
        print()
        print(level2Users)
        print()
        print()
        print(level3Users)



        return Response({"users": finalList})

    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)
