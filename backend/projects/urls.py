from django.urls import path
from .views import ProjectCreateView, ProjectListView, AddMemberView, ProjectDetailView

urlpatterns = [
    path('', ProjectListView.as_view(), name='project-list'),
    path('create/', ProjectCreateView.as_view(), name='project-create'),
    path('<int:project_id>/', ProjectDetailView.as_view(), name='project-detail'),
    path('<int:project_id>/add-member/', AddMemberView.as_view(), name='add-member'),
]
