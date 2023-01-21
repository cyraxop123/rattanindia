from django.contrib import admin

from excitelapi.models import ContactUs, DepositMoney, ExcitelFinanceProducts, ExcitelProducts, Lifafa, Transactions, User, BankAccount, UserFinanceProduct, UserProduct, extraDetails, ownerNumber, withdrawalRequest, Notification, TotalPay

# Register your models here.
admin.site.register((User, ExcitelProducts, ExcitelFinanceProducts, BankAccount, UserProduct, UserFinanceProduct, Transactions, withdrawalRequest, Lifafa, ownerNumber, extraDetails, DepositMoney, ContactUs, Notification, TotalPay))