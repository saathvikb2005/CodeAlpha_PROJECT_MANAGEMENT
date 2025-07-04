# projects/serializers.py
from rest_framework import serializers
from .models import Project, ProjectMembership
from django.contrib.auth.models import User
from tasks.models import Task
from tasks.serializers import TaskSerializer  # ✅ import task serializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class ProjectMembershipSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = ProjectMembership
        fields = ['user', 'role']

class ProjectSerializer(serializers.ModelSerializer):
    members = serializers.SerializerMethodField()
    tasks = TaskSerializer(many=True, read_only=True)  # ✅ include related tasks

    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'created_by', 'created_at', 'members', 'tasks']
        read_only_fields = ['created_by', 'created_at']

    def get_members(self, obj):
        memberships = obj.memberships.select_related("user")  # better performance
        return [UserSerializer(m.user).data for m in memberships]
