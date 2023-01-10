import datetime
import pytz


def getExpireTime(time):
    print(time)
    a = datetime.datetime.now(pytz.timezone("Asia/Kolkata")) + datetime.timedelta(days=int(time))
    return a.date()


def checkExpireTime(time):
    todayTime = datetime.datetime.now(pytz.timezone("Asia/Kolkata")).date()
    a = todayTime - time
    print(str(a.total_seconds()).startswith('-'))
    return str(a.total_seconds()).startswith('-')