import React, { useState } from 'react';
import Flatpickr from 'react-flatpickr'; // Certifique-se de instalar a biblioteca Flatpickr
import 'flatpickr/dist/flatpickr.css'; // Estilos do Flatpickr
import Modal from 'react-modal'; // Você pode usar a biblioteca react-modal ou outra de sua preferência

// Configuração do modal
Modal.setAppElement('#root'); // Defina o elemento principal da aplicação

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
        <div>
            <h2>Your Reservation Requests</h2>
            <button onClick={() => setModalIsOpen(true)}>Reserve</button>
            <table>
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

            {/* Modal for Reservation */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Reserve Lab"
            >
                <h2>Reserve Lab</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Lab:
                        <select name="lab" value={newReservation.lab} onChange={handleInputChange}>
                            <option value="">Select Lab</option>
                            {labs.filter(lab => lab.available).map(lab => (
                                <option key={lab.id} value={lab.name}>{lab.name}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Discipline:
                        <select name="discipline" value={newReservation.discipline} onChange={handleInputChange}>
                            <option value="">Select Discipline</option>
                            {disciplines.map(discipline => (
                                <option key={discipline} value={discipline}>{discipline}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Date:
                        <Flatpickr
                            name="date"
                            value={newReservation.date}
                            onChange={date => setNewReservation(prev => ({ ...prev, date: date[0].toISOString().split('T')[0] }))}
                            options={{ dateFormat: "Y-m-d", minDate: "today" }}
                        />
                    </label>
                    <label>
                        Start Time:
                        <Flatpickr
                            name="startTime"
                            value={newReservation.startTime}
                            onChange={time => setNewReservation(prev => ({ ...prev, startTime: time[0].toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }))}
                            options={{ enableTime: true, noCalendar: true, dateFormat: "H:i", time_24hr: true }}
                        />
                    </label>
                    <label>
                        End Time:
                        <Flatpickr
                            name="endTime"
                            value={newReservation.endTime}
                            onChange={time => setNewReservation(prev => ({ ...prev, endTime: time[0].toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }))}
                            options={{ enableTime: true, noCalendar: true, dateFormat: "H:i", time_24hr: true }}
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
                <button onClick={() => setModalIsOpen(false)}>Close</button>
            </Modal>
        </div>
    );
}

export default LabProfessor;
