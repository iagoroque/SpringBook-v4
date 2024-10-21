import React, { useState } from 'react';

function LabSchedule() {
    const labs = [
        { id: 1, name: "Lab A", available: true },
        { id: 2, name: "Lab B", available: false },
        { id: 3, name: "Lab C", available: true }
    ];

    const disciplines = ["Physics", "Chemistry", "Biology"];

    const reservations = [
        { id: 1, lab: "Lab A", discipline: "Physics", professor: "Osvaldo", date: "2024-10-18", startTime: "10:00", endTime: "12:00" },
        { id: 2, lab: "Lab C", discipline: "Biology", professor: "Elton", date: "2024-10-19", startTime: "14:00", endTime: "16:00" }
    ];

    const [selectedLab, setSelectedLab] = useState('');
    const [selectedDiscipline, setSelectedDiscipline] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleReservationSubmit = (e) => {
        e.preventDefault();
        window.location.href = "/login"; // Ajuste conforme necessário
    };

    return (
        <div>
            <h2>Labs Schedule</h2>
            <button onClick={() => window.location.href = "/login"}>Login</button>
            <table>
                <thead>
                    <tr>
                        <th>Lab</th>
                        <th>Discipline</th>
                        <th>Professor</th>
                        <th>Date & Time</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((reservation, index) => (
                        <tr key={reservation.id}>
                            <td>{reservation.lab}</td>
                            <td>{reservation.discipline}</td>
                            <td>{reservation.professor}</td>
                            <td>{reservation.date} {reservation.startTime} - {reservation.endTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LabSchedule;