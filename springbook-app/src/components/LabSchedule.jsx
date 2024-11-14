import React, { useState, useEffect } from "react";
import bookingFetch from "../axios/BookingFetch";

const LabSchedule = () => {
    const reservations = [
        {
            id: 2,
            lab: "Lab B",
            discipline: "Physics",
            professor: "Osvaldo",
            date: "2024-10-18",
            startTime: "10:00",
            endTime: "12:00",
        },
        {
            id: 2,
            lab: "Lab C",
            discipline: "Biology",
            professor: "Elton",
            date: "2024-10-19",
            startTime: "14:00",
            endTime: "16:00",
        },
    ];

    const [booking, setBooking] = useState([]);
    const [selectedLab, setSelectedLab] = useState("");
    const [selectedDiscipline, setSelectedDiscipline] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await bookingFetch.get(`/findAll`);
                const data = response.data;
                console.log(response.data);
                setBooking(data);
            } catch (error) {
                console.error("Erro ao buscar os cursos", error);
            }
        };

        const delay = setTimeout(() => {
            fetchData();
        }, 1000);

        return () => clearTimeout(delay);
    }, []);

    const handleReservationSubmit = (e) => {
        e.preventDefault();
        window.location.href = "/login"; // Ajuste conforme necessário
    };

    return (
        <div>
            <h2>Labs Schedule</h2>
            <button onClick={() => (window.location.href = "/login")}>
                Login
            </button>
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
                            <td>
                                {reservation.date} {reservation.startTime} -{" "}
                                {reservation.endTime}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LabSchedule;
