import jwt
from .secrets import JWT_SECRET


def genJwtToken(number):
    return jwt.encode({"number": number}, JWT_SECRET, algorithm="HS256")


def getUserJWT(token):
    try:
        data = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        return data["number"]
    except Exception:
        return False


def getAuthDetails(token):
    try:
        data = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        return data
    except Exception:
        return False