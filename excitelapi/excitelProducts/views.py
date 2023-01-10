from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer

from excitelapi.models import ExcitelFinanceProducts, ExcitelProducts
from excitelapi.serializers import ProductFinanceSchema, ProductSchema

# Create your views here.


SERVER_ERROR = {"success": False, "message": "Server Error"}

@api_view(['GET'])
@renderer_classes([JSONRenderer])
def excitelProducts(request):
    try:
        data = ExcitelProducts.objects.all()
        excitelProduct = ProductSchema(data, many=True)
        return Response(excitelProduct.data)
    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)

@api_view(['GET'])
@renderer_classes([JSONRenderer])
def excitelFinanceProducts(request):
    try:
        data = ExcitelFinanceProducts.objects.all()
        excitelProduct = ProductFinanceSchema(data, many=True)
        return Response(excitelProduct.data)
    except Exception as e:
        print(e)
        return Response(SERVER_ERROR)
