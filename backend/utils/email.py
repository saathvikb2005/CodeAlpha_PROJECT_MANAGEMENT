from django.core.mail import send_mail
from django.conf import settings

def send_task_assignment_email(to_email, task_title, project_name):
    subject = f"New Task Assigned: {task_title}"
    message = f"You have been assigned a new task '{task_title}' in project '{project_name}'."
    from_email = settings.DEFAULT_FROM_EMAIL if hasattr(settings, 'DEFAULT_FROM_EMAIL') else 'noreply@example.com'

    send_mail(
        subject,
        message,
        from_email,
        [to_email],
        fail_silently=False,
    )
