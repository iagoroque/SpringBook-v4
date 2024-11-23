import React, { useState, useEffect } from "react";
import bookingFetch from "../axios/BookingFetch";
import '../App.css'; // Importando o CSS global

const LabAdmin = () => {
    const [pendingBookings, setPendingBookings] = useState([]);
    const [approvedBookings, setApprovedBookings] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const responsePending = await bookingFetch.get(`/findPending`);
                setPendingBookings(responsePending.data);

                const responseApproved = await bookingFetch.get(`/findApproved`);
                setApprovedBookings(responseApproved.data);
            } catch (error) {
                console.error("Erro ao buscar as reservas", error);
            }
        };

        fetchBookings();
    }, [refresh]);

    const approveBooking = async (bookingId) => {
        const confirmed = window.confirm(
            "Tem certeza de que deseja aprovar esta reserva?"
        );
        if (confirmed) {
            try {
                await bookingFetch.put(`/approve/${bookingId}`);
                console.log(`Reserva com ID ${bookingId} foi aprovada!`);
                setRefresh((prev) => !prev);
            } catch (error) {
                console.error("Erro ao aprovar a reserva", error);
            }
        }
    };

    const deleteBooking = async (bookingId) => {
        const confirmed = window.confirm(
            "Tem certeza de que deseja deletar esta reserva?"
        );
        if (confirmed) {
            try {
                await bookingFetch.delete(`/delete/${bookingId}`);
                console.log(`Reserva com ID ${bookingId} foi deletada!`);
                setRefresh((prev) => !prev);
            } catch (error) {
                console.error("Erro ao deletar a reserva", error);
            }
        }
    };

    return (
        <div className="main-container">
            <img src="/images/logo-blue.png" alt="Logo" className="logo" />
            <h2>Admin Panel - Reservations</h2>
            <div className="table-container">
                <h3>Pending Requests</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Lab</th>
                            <th>Discipline</th>
                            <th>Professor</th>
                            <th>Date & Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingBookings.map((booking, index) => (
                            <tr key={booking.booking.id}>
                                <td>{index + 1}</td>
                                <td>{booking.lab.lami}</td>
                                <td>{booking.subject.name}</td>
                                <td>{booking.professor.name}</td>
                                <td>
                                    {new Date(booking.booking.timeInit).toLocaleString()} -{" "}
                                    {new Date(booking.booking.timeFinal).toLocaleTimeString()}
                                </td>
                                <td>
                                    <i
                                        className="fas fa-check-circle text-success"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => approveBooking(booking.booking.id)}
                                    ></i>
                                    <i
                                        className="fas fa-trash-alt text-danger"
                                        style={{
                                            cursor: "pointer",
                                            marginLeft: "10px",
                                        }}
                                        onClick={() => deleteBooking(booking.booking.id)}
                                    ></i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="table-container">
                <h3>Approved Requests</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Lab</th>
                            <th>Discipline</th>
                            <th>Professor</th>
                            <th>Date & Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {approvedBookings.map((booking, index) => (
                            <tr key={booking.booking.id}>
                                <td>{index + 1}</td>
                                <td>{booking.lab.lami}</td>
                                <td>{booking.subject.name}</td>
                                <td>{booking.professor.name}</td>
                                <td>
                                    {new Date(booking.booking.timeInit).toLocaleString()} -{" "}
                                    {new Date(booking.booking.timeFinal).toLocaleTimeString()}
                                </td>
                                <td>
                                    <i
                                        className="fas fa-trash-alt text-danger"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => deleteBooking(booking.booking.id)}
                                    ></i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LabAdmin;
