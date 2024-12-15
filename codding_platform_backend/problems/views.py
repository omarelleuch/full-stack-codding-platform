from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Problem
from .serializers import ProblemSerializer
from rest_framework.exceptions import NotFound
import requests
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

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
    
class RunCodeAPIView(APIView):
    def post(self, request):
        source_code = request.data.get("source_code")
        language_id = request.data.get("language_id")
        stdin = request.data.get("stdin", "")

        if not source_code or not language_id:
            return Response({"error": "source_code and language_id are required"}, status=status.HTTP_400_BAD_REQUEST)

        judge0_url = "http://localhost:2358/submissions/?base64_encoded=false&wait=true"
        payload = {
            "source_code": source_code,
            "language_id": language_id,
            "stdin": stdin,
        }

        try:
            response = requests.post(judge0_url, json=payload)
            response_data = response.json()
            return Response(response_data, status=response.status_code)
        except requests.exceptions.RequestException:
            return Response({"error": "Failed to connect to Judge0"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
