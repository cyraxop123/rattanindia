# Generated by Django 4.1.2 on 2023-01-08 23:17

import datetime
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="BankAccount",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("holderName", models.CharField(max_length=100)),
                ("accountNumber", models.BigIntegerField()),
                ("IFSC", models.CharField(max_length=100)),
                ("bankAccountName", models.CharField(max_length=200)),
                ("upiId", models.CharField(blank=True, max_length=100)),
                ("primaryBank", models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name="ContactUs",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                ("email", models.EmailField(max_length=254)),
                ("message", models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name="ExcitelFinanceProducts",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("unique_id", models.CharField(max_length=10)),
                ("validity", models.CharField(max_length=20)),
                ("minimum_invest", models.IntegerField()),
                ("daily_income", models.FloatField()),
                ("price", models.FloatField()),
                ("total_sell", models.BigIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name="ExcitelProducts",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("unique_id", models.CharField(max_length=10)),
                ("title", models.CharField(max_length=20)),
                ("validity", models.IntegerField()),
                ("price", models.FloatField()),
                ("hourly_income", models.FloatField()),
                ("real_price", models.FloatField(blank=True)),
                ("image_url", models.CharField(max_length=1000)),
                ("total_sell", models.BigIntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name="extraDetails",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("minimum_withdraw", models.IntegerField()),
                ("minimum_recharge", models.IntegerField()),
                ("tax_on_withdraw", models.IntegerField()),
                ("recharge_channel1", models.BooleanField()),
                ("recharge_channel2", models.BooleanField()),
                ("recharge_channel3", models.BooleanField()),
                ("purchase_commissionLvl1", models.IntegerField()),
                ("purchase_commissionLvl2", models.IntegerField()),
                ("purchase_commissionLvl3", models.IntegerField()),
                ("is_upi", models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name="Lifafa",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("LIFAFA_CODE", models.CharField(max_length=15)),
                ("amount", models.IntegerField()),
                ("is_active", models.BooleanField(default=False)),
                ("timestamp", models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name="Notification",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=25)),
                ("desc", models.CharField(max_length=100)),
                ("timestamp", models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name="ownerNumber",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("numbers", models.BigIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name="User",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=20)),
                ("mobile_number", models.BigIntegerField(unique=True)),
                ("password", models.CharField(max_length=300)),
                ("balance", models.FloatField(default=0)),
                ("is_active", models.BooleanField(default=False)),
                ("referId", models.CharField(blank=True, max_length=6, unique=True)),
                ("refer_by", models.CharField(blank=True, max_length=6)),
                ("today_earning", models.FloatField(blank=True, default=0)),
                ("isFirstLogin", models.CharField(default="t", max_length=1)),
                ("depositAmount", models.FloatField(default=0)),
                ("timestamp", models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name="withdrawalRequest",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("status", models.CharField(default="Pending", max_length=20)),
                ("rejection_reason", models.CharField(blank=True, max_length=50)),
                ("money", models.BigIntegerField()),
                ("is_upi", models.BooleanField()),
                ("transactionId", models.CharField(max_length=25, unique=True)),
                ("timestamp", models.DateTimeField(default=django.utils.timezone.now)),
                (
                    "Bank",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="excitelapi.bankaccount",
                    ),
                ),
                (
                    "User",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="excitelapi.user",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="UserProduct",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("unique_id", models.CharField(max_length=10)),
                ("title", models.CharField(max_length=20)),
                ("validity", models.IntegerField()),
                ("price", models.FloatField()),
                ("hourly_income", models.FloatField()),
                ("image_url", models.CharField(max_length=1000)),
                ("expire_on", models.DateField()),
                ("timestamp", models.DateTimeField(default=django.utils.timezone.now)),
                (
                    "User",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="excitelapi.user",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="UserFinanceProduct",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("unique_id", models.CharField(max_length=10)),
                ("validity", models.CharField(max_length=20)),
                ("daily_income", models.FloatField()),
                ("price", models.FloatField()),
                ("expire_on", models.DateField()),
                ("user_invest", models.BigIntegerField()),
                ("minimum_invest", models.IntegerField()),
                ("timestamp", models.DateTimeField(default=django.utils.timezone.now)),
                (
                    "User",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="excitelapi.user",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Transactions",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=25)),
                ("catagory", models.CharField(max_length=25)),
                ("price", models.IntegerField()),
                ("up_or_down", models.CharField(max_length=6)),
                ("transactionId", models.CharField(max_length=25, unique=True)),
                ("is_done", models.BooleanField(default=False)),
                ("timestamp", models.DateTimeField(default=django.utils.timezone.now)),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="excitelapi.user",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="DepositMoney",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("amount", models.IntegerField()),
                ("trid", models.CharField(max_length=25)),
                (
                    "time",
                    models.DateTimeField(
                        default=datetime.datetime(2023, 1, 8, 23, 17, 32, 38688)
                    ),
                ),
                ("status", models.CharField(max_length=10)),
                ("timestamp", models.DateTimeField(default=django.utils.timezone.now)),
                (
                    "User",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="excitelapi.user",
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="bankaccount",
            name="User",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="excitelapi.user"
            ),
        ),
    ]