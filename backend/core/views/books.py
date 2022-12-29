from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from core.models import Book
from core.serializers import BookSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def bookList(request):
    books = Book.objects.all()
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def bookDetail(request, pk):
    books = Book.objects.get(id=pk)
    serializer = BookSerializer(books, many=False)
    return Response(serializer.data)

@api_view(["POST"])
def bookCreate(request):
    serializer = BookSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(["POST"])
def bookUpdate(request, pk):
    book = Book.objects.get(id=pk)
    serializer = BookSerializer(instance=book, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(["DELETE"])
def bookDelete(request, pk):
    book = Book.objects.get(id=pk)
    book.delete()

    return Response("Item successfully deleted!")
