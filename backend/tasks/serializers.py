from rest_framework import serializers
from .models import Task, Comment
from django.contrib.auth.models import User


class TaskSerializer(serializers.ModelSerializer):
    assigned_to_username = serializers.CharField(source='assigned_to.username', read_only=True)

    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ['created_by', 'created_at']


class CommentSerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'content', 'timestamp', 'user_username']
