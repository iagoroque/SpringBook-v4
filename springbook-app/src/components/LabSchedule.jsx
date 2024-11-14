import React, { useState, useEffect } from "react";
import bookingFetch from "../axios/BookingFetch";

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
                console.error("Erro ao buscar os cursos", error);
            }
        };

        fetchData();
    }, []);

    const handleReservationSubmit = (e) => {
        e.preventDefault();
        window.location.href = "/login";
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
                    {booking.map((reservation, index) => (
                        <tr key={reservation.booking.id}>
                            <td>{reservation.lab.lami}</td>
                            <td>{reservation.subject.name}</td>
                            <td>{reservation.professor.name}</td>
                            <td>
                                {new Date(
                                    reservation.booking.timeInit
                                ).toLocaleString()}{" "}
                                -{" "}
                                {new Date(
                                    reservation.booking.timeFinal
                                ).toLocaleTimeString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LabSchedule;
