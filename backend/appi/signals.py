from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from .models import Appointment

@receiver(post_save, sender=Appointment)
def send_email_confirmation(sender, instance, created, **kwargs):
    if created: 
        send_mail(
            subject=f"Cita Creada con exito: {instance.title}",
            message=f"""
            Hola, tu cita ha sido agendada:

            Nombres: {instance.title}   
            Fecha: {instance.date}
            Hora de entrada: {instance.time_in}
            Hora de salida: {instance.time_out}
            Plataforma: {instance.platform}
            Link: {instance.link}

            ¡Gracias por agendar con nosotros!
            """,
            from_email="joinerjoel12@gmail.com",  
            recipient_list=[instance.email],
            fail_silently=False,
        )
