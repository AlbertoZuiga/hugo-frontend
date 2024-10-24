// ProtectedSchedule.js
import React, { useState } from "react";
import "./ProtectedSchedule.css"; // Asegúrate de crear este archivo para los estilos

const ProtectedSchedule = () => {
  const timeSlots = [
    { start: "08:30", end: "09:20" },
    { start: "09:30", end: "10:20" },
    { start: "10:30", end: "11:20" },
    { start: "11:30", end: "12:20" },
    { start: "12:30", end: "13:20" },
    { start: "13:30", end: "14:20" },
    { start: "14:30", end: "15:20" },
    { start: "15:30", end: "16:20" },
    { start: "16:30", end: "17:20" },
    { start: "17:30", end: "18:20" },
    { start: "18:30", end: "19:20" },
    { start: "19:30", end: "20:20" },
    { start: "20:30", end: "21:20" },
  ];

  const daysOfWeek = ["lunes", "martes", "miercoles", "jueves", "viernes"];

  // Estado para almacenar los horarios protegidos
  const [protectedTimes, setProtectedTimes] = useState(
    timeSlots.map(() =>
      daysOfWeek.reduce((acc, day) => {
        acc[day] = false;
        return acc;
      }, {})
    )
  );

  // Estado para gestionar el drag y el click
  const [isDragging, setIsDragging] = useState(false);
  const [dragAction, setDragAction] = useState(null); // null, 'select', or 'deselect'
  const [dragStart, setDragStart] = useState({ row: null, col: null }); // Indica la celda inicial

  const handleMouseDown = (slotIndex, dayIndex) => {
    const isSelected = protectedTimes[slotIndex][daysOfWeek[dayIndex]];
    setIsDragging(true);
    setDragAction(isSelected ? "deselect" : "select");
    setDragStart({ row: slotIndex, col: dayIndex });
    toggleCell(slotIndex, dayIndex, isSelected);
  };

  const handleMouseEnter = (slotIndex, dayIndex) => {
    if (isDragging) {
      handleToggleArea(dragStart.row, dragStart.col, slotIndex, dayIndex); // Actualiza el área de arrastre
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false); // Finaliza el arrastre
  };

  const toggleCell = (slotIndex, dayIndex, isSelected) => {
    setProtectedTimes((prev) => {
      const newProtectedTimes = [...prev];
      newProtectedTimes[slotIndex] = {
        ...newProtectedTimes[slotIndex],
        [daysOfWeek[dayIndex]]: !isSelected, // Cambia el estado de la celda
      };
      return newProtectedTimes;
    });
  };

  // Actualiza todas las celdas dentro del área
  const handleToggleArea = (startRow, startCol, endRow, endCol) => {
    const minRow = Math.min(startRow, endRow);
    const maxRow = Math.max(startRow, endRow);
    const minCol = Math.min(startCol, endCol);
    const maxCol = Math.max(startCol, endCol);

    setProtectedTimes((prev) => {
      const newProtectedTimes = [...prev]; // Copia el estado anterior

      // Itera sobre el área afectada
      for (let row = minRow; row <= maxRow; row++) {
        for (let col = minCol; col <= maxCol; col++) {
          newProtectedTimes[row] = {
            ...newProtectedTimes[row],
            [daysOfWeek[col]]: dragAction === "select",
          };
        }
      }

      return newProtectedTimes;
    });
  };

  return (
    <div
      className="protected-schedule"
      onMouseUp={handleMouseUp} // Detecta el mouseup a nivel de la tabla
    >
      <h1>Selecciona tus horarios protegidos</h1>
      <table className="schedule-table">
        <thead>
          <tr>
            <th className="time-column">Hora</th>
            {daysOfWeek.map((day) => (
              <th key={day} className="day-column">
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot, index) => (
            <tr key={index}>
              <td className="time-column">{`${slot.start} - ${slot.end}`}</td>
              {daysOfWeek.map((day, dayIndex) => (
                <td
                  key={day}
                  onMouseDown={() => handleMouseDown(index, dayIndex)} // Inicia el click-and-drag
                  onMouseEnter={() => handleMouseEnter(index, dayIndex)} // Continua el drag
                  className={`day-cell ${
                    protectedTimes[index][day] ? "selected" : ""
                  }`} // Clase CSS según el estado
                >
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={protectedTimes[index][day]}
                      readOnly // Hacer el checkbox de solo lectura
                      className="hidden-checkbox"
                    />
                  </label>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProtectedSchedule;
