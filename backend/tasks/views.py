from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from rest_framework.exceptions import PermissionDenied
from rest_framework import generics

from .models import Task, Comment
from .serializers import TaskSerializer, CommentSerializer
from projects.models import Project

from django.core.mail import send_mail
from django.conf import settings


class TaskCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, project_id):
        try:
            project = Project.objects.get(id=project_id)
        except Project.DoesNotExist:
            return Response({"error": "Project not found"}, status=404)

        if not project.memberships.filter(user=request.user).exists():
            raise PermissionDenied("You are not a member of this project")

        data = request.data.copy()
        data['project'] = project.id

        serializer = TaskSerializer(data=data)
        if serializer.is_valid():
            serializer.save(created_by=request.user)

            # ✅ Send email if assigned_to has an email
            task = serializer.instance
            assigned_user = task.assigned_to
            if assigned_user and assigned_user.email:
                subject = f"New Task Assigned: {task.title}"
                message = f"You have been assigned a new task '{task.title}' in project '{project.name}'."
                from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', 'noreply@example.com')
                to_email = assigned_user.email

                try:
                    send_mail(subject, message, from_email, [to_email], fail_silently=False)
                    print(f"📧 Email sent to {to_email}")
                except Exception as e:
                    print(f"❌ Failed to send email: {e}")

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("Task creation failed with:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, task_id):
        try:
            task = Task.objects.get(id=task_id)
        except Task.DoesNotExist:
            return Response({"error": "Task not found"}, status=404)

        if not task.project.memberships.filter(user=request.user).exists():
            raise PermissionDenied()

        serializer = TaskSerializer(task)
        return Response(serializer.data)


class TaskUpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, task_id):
        try:
            task = Task.objects.get(id=task_id)
        except Task.DoesNotExist:
            return Response({"error": "Task not found"}, status=404)

        if not task.project.memberships.filter(user=request.user).exists():
            raise PermissionDenied()

        serializer = TaskSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


class TaskDeleteView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, task_id):
        try:
            task = Task.objects.get(id=task_id)
        except Task.DoesNotExist:
            return Response({"error": "Task not found"}, status=404)

        if not task.project.memberships.filter(user=request.user).exists():
            raise PermissionDenied()

        task.delete()
        return Response({"message": "Task deleted"}, status=204)


class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        task_id = self.kwargs['task_id']
        return Comment.objects.filter(task_id=task_id).order_by("timestamp")

    def perform_create(self, serializer):
        task_id = self.kwargs['task_id']
        task = Task.objects.get(id=task_id)
        serializer.save(task=task, user=self.request.user)
