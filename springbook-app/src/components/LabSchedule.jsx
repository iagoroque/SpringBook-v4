import React, { useState, useEffect } from "react";
import bookingFetch from "../axios/BookingFetch";
import '../App.css'; // Importando o CSS global

const LabSchedule = () => {
    const [booking, setBooking] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await bookingFetch.get(`/findApproved`);
                const data = response.data;
                console.log(response.data);
                setBooking(data);
            } catch (error) {
                console.error("Erro ao buscar as reservas", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="main-container">
            <img src="/images/logo-blue.png" alt="Logo" className="logo" />
            <h2>Labs Schedule</h2>
            <button className="btn-primary" onClick={() => (window.location.href = "/login")}>
                Login
            </button>
            <div className="table-container">
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
                        {booking.map((reservation) => (
                            <tr key={reservation.booking.id}>
                                <td>{reservation.lab.lami}</td>
                                <td>{reservation.subject.name}</td>
                                <td>{reservation.professor.name}</td>
                                <td>
                                    {new Date(reservation.booking.timeInit).toLocaleString()} -{" "}
                                    {new Date(reservation.booking.timeFinal).toLocaleTimeString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default LabSchedule;