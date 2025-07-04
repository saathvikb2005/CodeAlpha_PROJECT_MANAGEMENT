from django.urls import path
from .views import (
    TaskCreateView,
    TaskDetailView,
    TaskUpdateView,
    TaskDeleteView,
    CommentListCreateView
)

urlpatterns = [
    path('<int:project_id>/create/', TaskCreateView.as_view()),
    path('<int:task_id>/', TaskDetailView.as_view()),
    path('<int:task_id>/update/', TaskUpdateView.as_view()),
    path('<int:task_id>/delete/', TaskDeleteView.as_view()),
    path('<int:task_id>/comments/', CommentListCreateView.as_view()),  # ✅ added
]
