import React, { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '@fortawesome/fontawesome-free/css/all.min.css';

Modal.setAppElement('#root');

function LabProfessor() {
    const [reservations, setReservations] = useState([
        { id: 1, lab: "Lab A", discipline: "Physics", date: "2024-10-18", startTime: "10:00", endTime: "12:00", status: "Pending" },
        { id: 2, lab: "Lab C", discipline: "Biology", date: "2024-10-19", startTime: "14:00", endTime: "16:00", status: "Approved" }
    ]);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newReservation, setNewReservation] = useState({
        lab: '',
        discipline: '',
        date: '',
        startTime: '',
        endTime: ''
    });

    const labs = [
        { id: 1, name: "Lab A", available: true },
        { id: 2, name: "Lab B", available: false },
        { id: 3, name: "Lab C", available: true }
    ];

    const disciplines = ["Physics", "Chemistry", "Biology"];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReservation(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newId = reservations.length + 1;
        const reservationToAdd = { id: newId, ...newReservation, status: "Pending" };
        
        setReservations(prev => [...prev, reservationToAdd]);
        setModalIsOpen(false);
        setNewReservation({
            lab: '',
            discipline: '',
            date: '',
            startTime: '',
            endTime: ''
        });
    };

    return (
        <div className="container mt-5">
            <h2>Your Reservation Requests</h2>
            <button className="btn btn-primary mb-3" onClick={() => setModalIsOpen(true)}>Reserve</button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Lab</th>
                        <th>Discipline</th>
                        <th>Date & Time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((reservation, index) => (
                        <tr key={reservation.id}>
                            <td>{index + 1}</td>
                            <td>{reservation.lab}</td>
                            <td>{reservation.discipline}</td>
                            <td>{reservation.date} {reservation.startTime} - {reservation.endTime}</td>
                            <td>{reservation.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Reserve Lab"
                className="modal-dialog"
                overlayClassName="modal-backdrop"
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Reserve Lab</h5>
                        <button type="button" className="close" onClick={() => setModalIsOpen(false)}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Lab:</label>
                                <select className="form-control" name="lab" value={newReservation.lab} onChange={handleInputChange}>
                                    <option value="">Select Lab</option>
                                    {labs.filter(lab => lab.available).map(lab => (
                                        <option key={lab.id} value={lab.name}>{lab.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Discipline:</label>
                                <select className="form-control" name="discipline" value={newReservation.discipline} onChange={handleInputChange}>
                                    <option value="">Select Discipline</option>
                                    {disciplines.map(discipline => (
                                        <option key={discipline} value={discipline}>{discipline}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Date:</label>
                                <Flatpickr
                                    className="form-control"
                                    name="date"
                                    value={newReservation.date}
                                    onChange={date => setNewReservation(prev => ({ ...prev, date: date[0].toISOString().split('T')[0] }))}
                                    options={{ dateFormat: "Y-m-d", minDate: "today" }}
                                />
                            </div>
                            <div className="form-group">
                                <label>Start Time:</label>
                                <Flatpickr
                                    className="form-control"
                                    name="startTime"
                                    value={newReservation.startTime}
                                    onChange={time => setNewReservation(prev => ({ ...prev, startTime: time[0].toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }))}
                                    options={{ enableTime: true, noCalendar: true, dateFormat: "H:i", time_24hr: true }}
                                />
                            </div>
                            <div className="form-group">
                                <label>End Time:</label>
                                <Flatpickr
                                    className="form-control"
                                    name="endTime"
                                    value={newReservation.endTime}
                                    onChange={time => setNewReservation(prev => ({ ...prev, endTime: time[0].toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }))}
                                    options={{ enableTime: true, noCalendar: true, dateFormat: "H:i", time_24hr: true }}
                                />
                            </div>
                            <button type="submit" className="btn btn-success">Submit</button>
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default LabProfessor;