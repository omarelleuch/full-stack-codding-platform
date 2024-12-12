from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Problem
from .serializers import ProblemSerializer
from rest_framework.exceptions import NotFound

class ProblemList(APIView):
    def get(self, request):
        problems = Problem.objects.all()
        serializer = ProblemSerializer(problems, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProblemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProblemDetail(APIView):
    def get(self, request, id):
        try:
            problem = Problem.objects.get(question_id=id)  # Get the problem by ID
        except Problem.DoesNotExist:
            raise NotFound(detail="Problem not found", code=404)
        
        serializer = ProblemSerializer(problem)
        return Response(serializer.data)