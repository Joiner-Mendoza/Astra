from django.db import models

class Appointment(models.Model):
    ZOOM = 'Zoom'
    MEET = 'Google Meet'

    PENDING = 'pending'
    ACCEPTED = 'accepted'
    MISSED = 'missed'

    STATUS_CHOICES = [ #estados
        (PENDING,'pendiente'),
        (ACCEPTED,'aceptada'),
        (MISSED,'perdida'),
    ]
    PLATFORM_CHOICES = [ #plataformas
        (ZOOM, 'Zoom'),
        (MEET, 'Google Meet'),
    ]

    title = models.CharField(max_length=100)
    date = models.DateField()
    time_in = models.TimeField(verbose_name="Hora de ingreso de la cita", null=True, blank=True)
    time_out = models.TimeField(verbose_name="Hora de salida de la cita", null=True, blank=True)
    status = models.CharField(verbose_name="Estado", max_length=10, choices=STATUS_CHOICES, default=PENDING)
    email = models.EmailField(verbose_name="Correo Electrónico", max_length=255, null=True, blank=True)
    platform = models.CharField(max_length=20, choices=PLATFORM_CHOICES)
    link = models.URLField()

    def __str__(self):
        return f'{self.title} - {self.date} {self.time_in}'
