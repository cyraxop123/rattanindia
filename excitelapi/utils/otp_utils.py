import requests


def sendOtp(number: int):
    url = f"https://tganand.xyz/Ex/?mo={number}&type=1"
    try:
        req = requests.get(url=url, timeout=7)
        data = req.json()
        if not data["code"] == 200:
            return False
        return True

    except Exception as e:
        return False

def checkOTP(number: int, OTP: int):
    url = f"https://tganand.xyz/Ex/?mo={number}&type=2&otp={OTP}"
    try:
        req = requests.get(url=url, timeout=7)
        data = req.json()
        if not data["code"] == 200:
            return False
        return True

    except Exception as e:
        return False