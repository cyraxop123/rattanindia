from email.policy import default
from django.db import models
import datetime
from django.utils.timezone import now

# Create your models here.

class User(models.Model):
    name = models.CharField(max_length=20)
    mobile_number = models.BigIntegerField(unique=True)
    password = models.CharField(max_length=300)
    balance = models.FloatField(default=0)
    is_active =  models.BooleanField(default=False)
    referId = models.CharField(max_length=6,  blank=True, unique=True)
    refer_by = models.CharField(max_length=6,  blank=True)
    today_earning = models.FloatField(default=0, blank=True)
    isFirstLogin = models.CharField(default="t", max_length=1)
    depositAmount = models.FloatField(default=0)
    timestamp = models.DateTimeField(default=now)



class ExcitelProducts(models.Model):
    unique_id = models.CharField(max_length=10)
    title = models.CharField(max_length=20)
    validity = models.IntegerField()
    price = models.FloatField()
    hourly_income = models.FloatField()
    real_price = models.FloatField(blank=True)
    image_url = models.CharField(max_length=1000)
    total_sell = models.BigIntegerField(default=0)
    def __str__(self) -> str:
        return self.title

class ExcitelFinanceProducts(models.Model):
    unique_id = models.CharField(max_length=10)
    validity = models.CharField(max_length=20)
    minimum_invest = models.IntegerField()
    daily_income = models.FloatField()
    price = models.FloatField()
    total_sell = models.BigIntegerField()


class BankAccount(models.Model):
    User = models.ForeignKey(User, on_delete=models.CASCADE)
    holderName = models.CharField(max_length=100)
    accountNumber = models.BigIntegerField()
    IFSC = models.CharField(max_length=100)
    bankAccountName = models.CharField(max_length=200)
    upiId = models.CharField(max_length=100, blank=True)
    primaryBank = models.BooleanField(default=True)

class UserProduct(models.Model):
    User = models.ForeignKey(User, on_delete=models.CASCADE)
    unique_id = models.CharField(max_length=10)
    title = models.CharField(max_length=20)
    validity = models.IntegerField()
    price = models.FloatField()
    hourly_income = models.FloatField()
    image_url = models.CharField(max_length=1000)
    expire_on = models.DateField()
    timestamp = models.DateTimeField(default=now)

class UserFinanceProduct(models.Model):
    User = models.ForeignKey(User, on_delete=models.CASCADE)
    unique_id = models.CharField(max_length=10)
    validity = models.CharField(max_length=20)
    daily_income = models.FloatField()
    price = models.FloatField()
    expire_on = models.DateField()
    user_invest = models.BigIntegerField()
    minimum_invest = models.IntegerField()
    timestamp = models.DateTimeField(default=now)
    


class Transactions(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=25)
    catagory = models.CharField(max_length=25)
    price = models.IntegerField()
    up_or_down = models.CharField(max_length=6)
    transactionId = models.CharField(max_length=25, unique=True)
    is_done = models.BooleanField(default=False)
    timestamp = models.DateTimeField(default=now)

class withdrawalRequest(models.Model):
    User = models.ForeignKey(User, on_delete=models.CASCADE)
    Bank = models.ForeignKey(BankAccount, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, default="Pending")
    rejection_reason = models.CharField(max_length=50, blank=True)
    money = models.BigIntegerField()
    is_upi = models.BooleanField()
    transactionId = models.CharField(max_length=25, unique=True)
    timestamp = models.DateTimeField(default=now)

class Lifafa(models.Model):
    LIFAFA_CODE = models.CharField(max_length=15)
    amount = models.IntegerField()
    is_active = models.BooleanField(default=False)
    timestamp = models.DateTimeField(default=now)

class ownerNumber(models.Model):
    numbers = models.BigIntegerField()

class extraDetails(models.Model):
    minimum_withdraw = models.IntegerField()
    minimum_recharge = models.IntegerField()
    tax_on_withdraw = models.IntegerField()
    recharge_channel1 = models.BooleanField()
    recharge_channel2 = models.BooleanField()
    recharge_channel3 = models.BooleanField()
    purchase_commissionLvl1 = models.IntegerField()
    purchase_commissionLvl2 = models.IntegerField()
    purchase_commissionLvl3 = models.IntegerField()
    is_upi = models.BooleanField(default=False)


class DepositMoney(models.Model):
    User = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.IntegerField()
    trid = models.CharField(max_length=25)
    time = models.DateTimeField(default= datetime.datetime.now())
    status = models.CharField(max_length=10)
    timestamp = models.DateTimeField(default=now)


class ContactUs(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()


class Notification(models.Model):
    title = models.CharField(max_length=25)
    desc = models.CharField(max_length=100)
    timestamp = models.DateTimeField(default=now)
