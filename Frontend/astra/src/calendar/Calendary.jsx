import React, { useEffect, useRef, useState } from "react";
import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import "../styles/Calendary.css";
import { ModalAppointmentForm } from "../modals/ModalAppointmentForm";
import axios from "axios";
import Swal from "sweetalert2";

function Calendary() {
  const calendarRef = useRef();
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState({
    date: null,
    timeIn: "",
    timeOut: "",
  });
  const [currentView, setCurrentView] = useState("week");

  //  nuevos estados para el aside
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAside, setShowAside] = useState(false);

  const calendars = [
    {
      id: "1",
      name: "Reuniones",
      backgroundColor: "#0078ff",
    },
  ];

  // Cargar citas desde Django
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/appointments/")
      .then((res) => {
        const citas = res.data.map((appointment) => {
          let color = "#ccc";

          switch (appointment.status) {
            case "pending":
              color = "#d7d768";
              break;
            case "accepted":
              color = "#abdfab";
              break;
            case "missed":
              color = "#d9cfcf";
              break;
          }

          return {
            id: String(appointment.id),
            calendarId: "1",
            title: appointment.title,
            category: "time",
            start: `${appointment.date}T${appointment.time_in}`,
            end: `${appointment.date}T${appointment.time_out}`,
            backgroundColor: color,
            raw: {
              status: appointment.status,
              platform: appointment.platform,
              link: appointment.link,
              email: appointment.email
            },
          };
        });
        setEvents(citas);
      })
      .catch((err) => console.error("Error cargando citas:", err));
  }, []);

// vistas personalizadas(mes,dia,semana)
  const viewOptions = {
    month: {
      daynames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      startDayOfWeek: 1,
    },
    week: {
      daynames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      startDayOfWeek: 1,
      hourStart: 6,
      hourEnd: 18,
      taskView: false,
      milestoneView: false,
      alldayView: false,
    },
    day: {
      daynames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    },
  };

  //  Cambiar vista
  const handleChangeView = (e) => {
    const view = e.target.value;
    const calendarInstance = calendarRef.current?.getInstance();
    if (calendarInstance) {
      calendarInstance.changeView(view, true);
      setCurrentView(view);
    }
  };

  //  Navegación(botones next,previous)
  const handleNavigation = (action) => {
    const calendarInstance = calendarRef.current?.getInstance();
    if (!calendarInstance) return;

    switch (action) {
      case "prev":
        calendarInstance.prev();
        break;
      case "next":
        calendarInstance.next();
        break;
      case "today":
        calendarInstance.today();
        break;
      default:
        break;
    }
  };

  //  Al seleccionar un rango para nueva cita
  const handleSelectDateTime = (event) => {
    const start = new Date(event.start);
    const end = new Date(event.end);
    const now = new Date();

    if (start < now){
      Swal.fire({
        title:"Fecha o Hora invalida",
        text:'No puedes seleccionar una fecha o hora pasada.',
        icon:'error',
        confirmButtonText: "Aceptar",
      })
      return
    }
    const date = start.toISOString().split("T")[0];
    const timeIn = start.toTimeString().slice(0, 5);
    const timeOut = end.toTimeString().slice(0, 5);

    setSelectedInfo({ date, timeIn, timeOut });
    setShowForm(true);
  };

  //  Cuando se guarda una cita nueva
  const handleAppointmentSaved = (appointment) => {
    const calendarInstance = calendarRef.current?.getInstance();

    if (calendarInstance) {
      calendarInstance.createEvents([
        {
          id: String(Date.now()),
          calendarId: "1",
          title: appointment.title,
          category: "time",
          start: `${appointment.date}T${appointment.timeIn}`,
          end: `${appointment.date}T${appointment.timeOut}`,
          backgroundColor: "#d7d768",
          raw: {
            status: "pending",
            platform: appointment.platform || "Sin plataforma",
            link: appointment.link || "Sin enlace",
            email:appointment.email || 'Sin email'
          },
        },
      ]);
    }

    setShowForm(false);
  };

  //  mostrar aside al darle a una cita
  const handleClickEvent = (event) => {
    const data = event.event;

    setSelectedEvent({
      id: data.id,
      title: data.title,
      start: data.start.d.d,
      end: data.end.d.d,
      email: data.raw?.email,
      status: data.raw?.status,
      platform: data.raw?.platform,
      link: data.raw?.link,
    });
    console.log(data)
    setShowAside(true);
  };

  // actualizar la fecha de una cita
  const onBeforeUpdateSchedule = (event) => {
    // Desestructuramos el objeto recibido por el evento del calendario
    // "event" contiene la cita que se está actualizando
    // "changes"  contiene los nuevos valores (nueva fecha u hora)
    const { event: schedule, changes } = event;

    // Obtenemos la instancia del calendario para poder modificar el evento visualmente
    const calendarInstance = calendarRef.current?.getInstance();
    if (!calendarInstance) return;

    // Creamos nuevas fechas tipo Date a partir de los cambios
    // Si el usuario movió la cita, usamos el nuevo valor (`changes.start`)
    // Si no, usamos el valor actual (`schedule.start`)
    const newStart = new Date(changes.start || schedule.start);
    const newEnd = new Date(changes.end || schedule.end);

    // FORMATEO DE FECHA Y HORA para enviar correctamente al backend
    const date = newStart.toISOString().split('T')[0];//toISOString("2025-10-19T15:30:00.000Z") --- .split('T')[0] solo la parte "YYYY-MM-DD"
 
    const time_in = newStart.toTimeString().split(' ')[0];
    const time_out = newEnd.toTimeString().split(' ')[0];   
    //  Validación:citas a fechas pasadas
    const now = new Date();
    if (newStart < now) {
      Swal.fire({
        title: "Fecha inválida",
        text: "No puedes mover la cita a una fecha/hora pasada.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return false;
    }

    // Actualizamos visualmente el evento dentro del calendario
    calendarInstance.updateEvent(schedule.id, schedule.calendarId, changes);

    // endpoint
    axios.patch(`http://127.0.0.1:8000/api/appointments/${schedule.id}/`, {
      date,
      time_in,
      time_out,
    })
    .then(() => {
      Swal.fire({
        title: 'Reunión actualizada',
        text: 'La fecha de la reunión ha sido actualizada correctamente.',
        icon: 'success',
        confirmButtonText: "Aceptar"
      });
    })
    .catch((err) => {
      console.error('Error al actualizar', err);
      Swal.fire({
        title: 'Error al actualizar',
        text: 'Ha ocurrido un error inesperado al actualizar la fecha de la reunión.',
        icon: 'error',
        confirmButtonText: "Aceptar"
      });
    });
  };



  return (  
    <div className="container-calendar-cite">
      <div className="container-calendar">
        <h2 className="title-cal">Agendar reunion</h2>

        {/*  Botones de navegación */}
        <div style={{ textAlign: "center", marginBottom: "15px" }}>
          <button type="button" className="btn btn-sm" onClick={() => handleNavigation("prev")}>
            Anterior
          </button>
          <button type="button" className="btn btn-sm" onClick={() => handleNavigation("today")}>
            Hoy
          </button>
          <button type="button" className="btn btn-sm" onClick={() => handleNavigation("next")}>
            Siguiente
          </button>
        </div>

        {/* Selector de vista */}
        <div style={{ textAlign: "center", marginBottom: "15px" }}>
          <label htmlFor="viewSelect" style={{ marginRight: "10px", fontWeight: "bold" }}>
            Vista del calendario:
          </label>
          <select id="viewSelect" value={currentView} onChange={handleChangeView}>
            <option value="month">Mes</option>
            <option value="week">Semana</option>
            <option value="day">Día</option>
          </select>
        </div>

        {/* Calendario */}
        <Calendar
          ref={calendarRef}
          height="800px"
          view={currentView}
          useFormPopup={false}
          useDetailPopup={false}
          isReadOnly={false}
          calendars={calendars}
          month={viewOptions.month}
          week={viewOptions.week}
          day={viewOptions.day}
          events={events}
          onSelectDateTime={handleSelectDateTime}
          onClickEvent={handleClickEvent} 
          onBeforeUpdateEvent={onBeforeUpdateSchedule}//actualizar la fecha de la cita

        />

        {/*  Modal para nueva cita */}
        {showForm && (
          <ModalAppointmentForm
            date={selectedInfo.date}
            timeIn={selectedInfo.timeIn}
            timeOut={selectedInfo.timeOut}
            onClose={() => setShowForm(false)}
            onSaved={handleAppointmentSaved}
          />
        )}

        {/*Aside de detalles */}
        {showAside && selectedEvent && (
          <aside className="aside-event">
            <h3>Detalles de la cita</h3>
            <hr />
            <p><strong>Nombres:</strong> {selectedEvent.title}</p>
            <hr />
            <p><strong>Email:</strong> {selectedEvent.email}</p>
            <hr />
            <p><strong>Inicio:</strong> {selectedEvent.start.toLocaleString()}</p>
            <hr />
            <p><strong>Fin:</strong> {selectedEvent.end.toLocaleString()}</p>
            <hr />
            <p><strong>Estado:</strong> {selectedEvent.status}</p>
            <hr />
            <p><strong>Plataforma:</strong> {selectedEvent.platform}</p>
            <hr />
            <p>
              <strong>Enlace:</strong>{" "}
              <a href={selectedEvent.link} target="_blank" rel="noopener noreferrer">
                {selectedEvent.link}
              </a>
            </p>
            <hr />
            <button onClick={() => setShowAside(false)} className="btn-close">
              Cerrar
            </button>
          </aside>
        )}
      </div>
    </div>
  );
}

export { Calendary };
