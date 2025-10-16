import React, { useEffect, useRef, useState } from "react";
import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import "../styles/Calendary.css";
import { ModalAppointmentForm } from "../modals/ModalAppointmentForm";
import axios from "axios";

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
    axios
      .get("http://127.0.0.1:8000/api/appointments/")
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
      status: data.raw?.status,
      platform: data.raw?.platform,
      link: data.raw?.link,
    });

    setShowAside(true);
  };

  return (
    <div className="container-calendar-cite">
      <div className="container-calendar">
        <h2 className="title-cal">Agenda tus reuniones</h2>

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
          events={events}
          onSelectDateTime={handleSelectDateTime}
          onClickEvent={handleClickEvent} 
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
            <p><strong>Título:</strong> {selectedEvent.title}</p>
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
