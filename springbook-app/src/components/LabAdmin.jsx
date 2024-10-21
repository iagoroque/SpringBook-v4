import React, { useState } from 'react';
import '../styles/LabAdmin.css'; // Importe o CSS correspondente

function LabAdmin() {
    const [pendingBookings, setPendingBookings] = useState([
        { id: 1, lab: "Lab A", discipline: "Physics", startDateTime: "2024-10-18 10:00", endDateTime: "2024-10-18 11:00", professor: "Dr. Smith" },
        { id: 2, lab: "Lab B", discipline: "Chemistry", startDateTime: "2024-10-19 12:00", endDateTime: "2024-10-19 13:00", professor: "Dr. Johnson" }
    ]);

    const [approvedBookings, setApprovedBookings] = useState([
        { id: 3, lab: "Lab C", discipline: "Biology", startDateTime: "2024-10-20 14:00", endDateTime: "2024-10-20 15:00", professor: "Dr. Adams" }
    ]);

    const [activeTab, setActiveTab] = useState('pending');

    const approveBooking = (bookingId) => {
        const bookingIndex = pendingBookings.findIndex(b => b.id === bookingId);
        if (bookingIndex !== -1) {
            const approvedBooking = pendingBookings[bookingIndex];
            setPendingBookings(pendingBookings.filter(b => b.id !== bookingId));
            setApprovedBookings([...approvedBookings, approvedBooking]);
            alert(`Booking for ${approvedBooking.lab} approved!`);
        }
    };

    const deleteBooking = (bookingId, isPending) => {
        if (isPending) {
            setPendingBookings(pendingBookings.filter(b => b.id !== bookingId));
            alert(`Pending booking with ID ${bookingId} deleted!`);
        } else {
            setApprovedBookings(approvedBookings.filter(b => b.id !== bookingId));
            alert(`Approved booking with ID ${bookingId} deleted!`);
        }
    };

    return (
        <div className="lab-admin">
            <div className="tabs">
                <button className={activeTab === 'pending' ? 'active' : ''} onClick={() => setActiveTab('pending')}>Pending Requests</button>
                <button className={activeTab === 'approved' ? 'active' : ''} onClick={() => setActiveTab('approved')}>Approved Requests</button>
            </div>

            {activeTab === 'pending' && (
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
                            <tr key={booking.id}>
                                <td>{index + 1}</td>
                                <td>{booking.lab}</td>
                                <td>{booking.discipline}</td>
                                <td>{`${booking.startDateTime.split(" ")[0]} ${booking.startDateTime.split(" ")[1]} - ${booking.endDateTime.split(" ")[1]}`}</td>
                                <td>{booking.professor}</td>
                                <td>
                                    <i className="fas fa-check-circle text-success" style={{ cursor: 'pointer' }} onClick={() => approveBooking(booking.id)}></i>
                                    <i className="fas fa-trash-alt text-danger" style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={() => deleteBooking(booking.id, true)}></i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {activeTab === 'approved' && (
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
                            <tr key={booking.id}>
                                <td>{index + 1}</td>
                                <td>{booking.lab}</td>
                                <td>{booking.discipline}</td>
                                <td>{`${booking.startDateTime.split(" ")[0]} ${booking.startDateTime.split(" ")[1]} - ${booking.endDateTime.split(" ")[1]}`}</td>
                                <td>{booking.professor}</td>
                                <td>
                                    <i className="fas fa-trash-alt text-danger" style={{ cursor: 'pointer' }} onClick={() => deleteBooking(booking.id, false)}></i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default LabAdmin;