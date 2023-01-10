import random
import string
from ..models import Transactions

def genRandomTransactionId():
    letters = string.ascii_lowercase + string.ascii_uppercase
    a = ''.join(random.choice(letters) for _ in range(25))
    return a