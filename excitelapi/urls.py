from django.urls import path
from excitelapi.excitelProducts.views import excitelFinanceProducts, excitelProducts
from excitelapi.users.views import *
from excitelapi.views import *
from excitelapi.auth.views import *
from excitelapi.owner.views import *

urlpatterns = [
    path('', home),
    # AUTH API
    path('auth/login/', login),
    path('auth/signup/', signup),
    path('auth/verify-otp/', verifyAccount),
    path('auth/forget-password/', forgetPassword),
    path('auth/verify-forget-otp/', verifyForgetOTP),

    # PRODUCTS API

    path('products/product/', excitelProducts),
    path('products/financeProducts/', excitelFinanceProducts),
    path('products/buy/product/', buyExcitelPRoduct),
    path('products/buy/financeProduct/', buyExcitelFinanceProduct),
    path('products/withdraw/financeProduct/', userDeleteFinanceProduct),

    # USER INFO
    path('user/bankDetails/', getBankDetails),
    path('user/updateBankDetails/', updateBankDetails),
    path('user/bindBank/', BindBankDetails),
    path('user/get-user-info/', sendUserInfo),
    path('user/get-user-transaction/', sendUserTransaction),
    path('user/submit-withdrawalRequest/', submitWithDrawalRequest),
    path('user/get-withdrawalRequest/', getUserWithdrawalRequest),
    path('user/submit-lifafa/', checkAndDepositLifafa),
    path('user/get-finance/', getUserFinanceProduct),
    path('user/get-product/', getUserProduct),
    path('user/create-depositRequest/', createDepositRequest),
    path('user/get-referUsers/', getAllUserRefer),
    path('user/get-referUsers-level/', getAllUserReferWithLevel),
    
    
    # ADMIN API

    # WITHDRAWAL
    path('owner/update-withdrawalRequest/', updateUserWithdrawalRequest),
    path('owner/get-withdrawalRequest/', getAllUserWithdrawalRequest),
    path('owner/get-getWithdrawDetails/', getWithdrawDetails),

    # DEPOSIT
    path('owner/get-getDepositDetails/', getDepositDetails),

    # NOTIFICATION
    path('owner/create-notification/', notification),
    path('owner/get-notification/', getnotification),

    # GET TOKEN
    path('owner/get-token/', getNumberToToken),


    # GET ALL USERS
    path('owner/get-users/', getAllUser),
    path('owner/get-user/', getUser),
    path('owner/block-user/', blockUser),
    path('owner/unblock-user/', unblockUser),
    path('owner/get-refer-user/', getUserRefers),


    # LIFAFA
    path('owner/get-lifafa/', getLifafa),
    path('owner/create-lifafa/', createLifafa),
    path('owner/update-lifafa/', updateLifafa),
    path('owner/add-lifafa/', userDepositLifafa),

    # PRODUCTS
    path('owner/get-product/', getProductInfo), # POST
    path('owner/create-product/', createProductInfo), # POST
    path('owner/update-product/', updateProductInfo), # PATCH
    path('owner/delete-product/', deleteProductInfo), # DELETE

    # Finance products
    path('owner/get-finance-product/', getFinanceProductInfo), # POST
    path('owner/create-finance-product/', createFinanceProductInfo), # POST
    path('owner/update-finance-product/', updateFinanceProductInfo), # PATCH
    path('owner/delete-finance-product/', deleteFinanceProductInfo), # DELETE

    # Extra details
    path('owner/get-extra/', getExtraDetails), # POST
    path('owner/create-extra/', createExtraDetails), # POST
    path('sed/', paymentCallBack), # POST
    path('owner/transcations', getTransactions), # POST


    # UPDATE DATA WHILE USING LOOP
    path('update-data/', updateUsersTodayData),
    path('reset-data/', resetTodayEarning),


    
]
