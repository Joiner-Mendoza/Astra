import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ModalAppointmentForm.css";

function ModalAppointmentForm({ date, timeIn, timeOut, onClose, onSaved }) {
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("Zoom");
  const [link, setLink] = useState("");
  const [startTime, setStartTime] = useState(timeIn || "");
  const [endTime, setEndTime] = useState(timeOut || "");
  const [ email,setEmail ] = useState('');

  useEffect(() => {
    setStartTime(timeIn || "");
    setEndTime(timeOut || "");
  }, [timeIn, timeOut]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date) return;

    const formattedDate =
      date instanceof Date ? date.toISOString().split("T")[0] : date;

    const newAppointment = {
      title,
      date: formattedDate,
      time_in: startTime,
      time_out: endTime,
      platform,
      email,
      link,
    };
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/appointments/",
        newAppointment
      );
      console.log(" Cita creada:", response.data);
      onSaved(response.data);
    } catch (error) {
      console.error(" Error al crear la reunión:", error.response?.data || error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Agendar una reunión</h3>
        <form onSubmit={handleSubmit}>
          <label>Nombres y Apellidos:</label>
          <input
            type="text"
            value={title}
            placeholder="Ingresa nombres y apellidos"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="email"
            value={email}
            placeholder="ejemplo@gmial.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Fecha:</label>
          <input
            type="date"
            value={
              date instanceof Date ? date.toISOString().split("T")[0] : date
            }
            readOnly
          />

          <label>Hora de inicio:</label>
          <input type="time" value={startTime} readOnly />

          <label>Hora de fin:</label>
          <input type="time" value={endTime} readOnly />

          <label>Plataforma:</label>
          <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
            <option value="Zoom">Zoom</option>
            <option value="Google Meet">Google Meet</option>
          </select>

          <label>Enlace de reunión:</label>
          <input
            type="url"
            value={link}
            placeholder="Se enviara al email"
            onChange={(e) => setLink(e.target.value)}
            
          />
          <div className="buttons">
            <button type="submit" className="save">
              Guardar
            </button>
            <button type="button" className="cancel" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export { ModalAppointmentForm };
