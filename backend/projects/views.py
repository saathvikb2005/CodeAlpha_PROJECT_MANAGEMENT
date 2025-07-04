from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth.models import User

from .models import Project, ProjectMembership
from .serializers import ProjectSerializer, ProjectMembershipSerializer

# Create a new project
class ProjectCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            project = serializer.save(created_by=request.user)
            # Automatically add creator to membership
            ProjectMembership.objects.create(user=request.user, project=project)
            return Response(ProjectSerializer(project).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# List projects for current user
class ProjectListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        memberships = ProjectMembership.objects.filter(user=request.user)
        projects = [m.project for m in memberships]
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)

# Add a user to a project
class AddMemberView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, project_id):
        try:
            project = Project.objects.get(id=project_id)
        except Project.DoesNotExist:
            return Response({"error": "Project not found"}, status=404)

        if project.created_by != request.user:
            raise PermissionDenied("Only the creator can add members.")

        username_or_email = request.data.get('username_or_email')
        try:
            user = User.objects.get(username=username_or_email)
        except User.DoesNotExist:
            try:
                user = User.objects.get(email=username_or_email)
            except User.DoesNotExist:
                return Response({"error": "User not found"}, status=404)

        # Add member
        membership, created = ProjectMembership.objects.get_or_create(user=user, project=project)
        if not created:
            return Response({"message": "User already in project"}, status=200)

        return Response({"message": f"{user.username} added to project"}, status=201)

# Get a single project with member check
class ProjectDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, project_id):
        try:
            project = Project.objects.get(id=project_id)
        except Project.DoesNotExist:
            return Response({"error": "Project not found"}, status=404)

        if not project.memberships.filter(user=request.user).exists():
            raise PermissionDenied()

        serializer = ProjectSerializer(project)
        return Response(serializer.data)
