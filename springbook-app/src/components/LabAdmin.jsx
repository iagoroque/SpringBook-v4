import React, { useState, useEffect } from "react";
import "../styles/LabAdmin.css"; // Importe o CSS correspondente
import bookingFetch from "../axios/BookingFetch";

const LabAdmin = () => {
    const [pendingBookings, setPendingBookings] = useState([]);
    const [approvedBookings, setApprovedBookings] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [activeTab, setActiveTab] = useState("pending");

    useEffect(() => {
        const isAdmin = localStorage.getItem("isAdmin");
        if (isAdmin !== "true") {
            window.location.href = "/login";
        }

        const fetchBooking = async () => {
            try {
                const response = await bookingFetch.get(`/findPending`);
                const data = response.data;
                console.log(response.data);
                setPendingBookings(data);
            } catch (error) {
                console.error("Erro ao buscar as reservas pendentes", error);
            }

            try {
                const response2 = await bookingFetch.get(`/findApproved`);
                const data2 = response2.data;
                console.log(response2.data);
                setApprovedBookings(data2);
            } catch (error) {
                console.error("Erro ao buscar as reservas aprovadas", error);
            }
        };

        fetchBooking();
    }, [refresh]);

    const approveBooking = async (bookingId) => {
        const confirmed = window.confirm(
            "Tem certeza de que deseja aprovar esta reserva?"
        );
        if (confirmed) {
            try {
                await bookingFetch.put(`/approve/${bookingId}`);
                console.log(`Reserva com ID ${bookingId} foi aprovada!`);
            } catch (error) {
                console.error("Erro ao aprovar a reserva", error);
            }
        }
        setRefresh((prev) => !prev);
    };

    const deleteBooking = async (bookingId) => {
        const confirmed = window.confirm(
            "Tem certeza de que deseja deletar esta reserva?"
        );
        if (confirmed) {
            try {
                await bookingFetch.delete(`/delete/${bookingId}`);
                console.log(`Reserva com ID ${bookingId} foi deletada!`);
            } catch (error) {
                console.error("Erro ao deletar a reserva", error);
            }
        }
        setRefresh((prev) => !prev);
    };

    return (
        <div className="lab-admin">
            <div className="tabs">
                <button
                    className={activeTab === "pending" ? "active" : ""}
                    onClick={() => setActiveTab("pending")}
                >
                    Pending Requests
                </button>
                <button
                    className={activeTab === "approved" ? "active" : ""}
                    onClick={() => setActiveTab("approved")}
                >
                    Approved Requests
                </button>
            </div>

            {activeTab === "pending" && (
                <table className="booking-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Lab</th>
                            <th>Discipline</th>
                            <th>Date & Time</th>
                            <th>Professor</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingBookings.map((booking, index) => (
                            <tr key={booking.booking.id}>
                                <td>{index + 1}</td>
                                <td>{booking.lab.lami}</td>
                                <td>{booking.subject.name}</td>
                                <td>
                                    {new Date(
                                        booking.booking.timeInit
                                    ).toLocaleString()}{" "}
                                    -{" "}
                                    {new Date(
                                        booking.booking.timeFinal
                                    ).toLocaleTimeString()}
                                </td>
                                <td>{booking.professor.name}</td>
                                <td>
                                    <i
                                        className="fas fa-check-circle text-success"
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                            approveBooking(booking.booking.id)
                                        }
                                    ></i>
                                    <i
                                        className="fas fa-trash-alt text-danger"
                                        style={{
                                            cursor: "pointer",
                                            marginLeft: "10px",
                                        }}
                                        onClick={() =>
                                            deleteBooking(booking.booking.id)
                                        }
                                    ></i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {activeTab === "approved" && (
                <table className="booking-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Lab</th>
                            <th>Discipline</th>
                            <th>Date & Time</th>
                            <th>Professor</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {approvedBookings.map((booking, index) => (
                            <tr key={booking.booking.id}>
                                <td>{index + 1}</td>
                                <td>{booking.lab.lami}</td>
                                <td>{booking.subject.name}</td>
                                <td>
                                    {new Date(
                                        booking.booking.timeInit
                                    ).toLocaleString()}{" "}
                                    -{" "}
                                    {new Date(
                                        booking.booking.timeFinal
                                    ).toLocaleTimeString()}
                                </td>
                                <td>{booking.professor.name}</td>
                                <td>
                                    <i
                                        className="fas fa-trash-alt text-danger"
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                            deleteBooking(booking.booking.id)
                                        }
                                    ></i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default LabAdmin;
