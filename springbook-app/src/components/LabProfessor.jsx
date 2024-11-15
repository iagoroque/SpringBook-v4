import React, { useState, useEffect } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import Modal from "react-modal";
import bookingFetch from "../axios/BookingFetch";
import labFetch from "../axios/LabFetch";
import professorFetch from "../axios/ProfessorFetch";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "@fortawesome/fontawesome-free/css/all.min.css";

Modal.setAppElement("#root");

const LabProfessor = () => {
    const [booking, setBooking] = useState([]);
    const [lab, setLab] = useState([]);
    const [professor, setProfessor] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [professorId, setProfessorId] = useState("");
    const [labId, setLabId] = useState("");
    const [subjectId, setSubjectId] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [timeInit, setTimeInit] = useState("");
    const [timeEnd, setTimeEnd] = useState("");
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchBooking = async () => {
            setProfessorId(localStorage.getItem("proId"));

            try {
                const response = await bookingFetch.get(`/findByProfessor/${professorId}`);
                const data = response.data;
                console.log(response.data);
                setBooking(data);
            } catch (error) {
                console.error("Erro ao buscar as reservas", error);
            }

            try {
                const response2 = await labFetch.get(`/findAll`);
                const data2 = response2.data;
                console.log(response2.data);
                setLab(data2);
            } catch (error) {
                console.error("Erro ao buscar os laboratórios", error);
            }

            try {
                const response3 = await professorFetch.get(
                    `/findSubjectsByProfessor/${professorId}`
                );
                const data3 = response3.data;
                console.log(response3.data);
                setProfessor(data3);
            } catch (error) {
                console.error("Erro ao buscar os Professores", error);
            }
        };

        fetchBooking();
    }, [professorId, refresh]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedStartTime = `${date}T${timeInit}:00`;
        const formattedEndTime = `${date}T${timeEnd}:00`;

        const newBooking = {
            professorId: professorId,
            labId: labId,
            subjectId: subjectId,
            timeInit: formattedStartTime,
            timeFinal: formattedEndTime,
        };

        try {
            const response = await bookingFetch.post(`/save`, newBooking);

            console.log("Sent to approve.", response.data);
        } catch (error) {
            console.error(error);
        }

        setModalIsOpen(false);
        setRefresh((prev) => !prev);
    };

    return (
        <div className="container mt-5">
            <h2>Your Reservation Requests</h2>
            <button
                className="btn btn-primary mb-3"
                onClick={() => setModalIsOpen(true)}
            >
                Reserve
            </button>
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
                    {booking.map((reservation, index) => (
                        <tr key={reservation.booking.id}>
                            <td>{index + 1}</td>
                            <td>{reservation.lab.lami}</td>
                            <td>{reservation.subject.name}</td>
                            <td>
                                {new Date(
                                    reservation.booking.timeInit
                                ).toLocaleString()}{" "}
                                -{" "}
                                {new Date(
                                    reservation.booking.timeFinal
                                ).toLocaleTimeString()}
                            </td>
                            <td>
                                {reservation.booking.approved
                                    ? "Aprovado"
                                    : "Pendente"}
                            </td>
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
                        <button
                            type="button"
                            className="close"
                            onClick={() => setModalIsOpen(false)}
                        >
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Lab:</label>
                                <select
                                    className="form-control"
                                    name="lab"
                                    value={labId}
                                    onChange={(e) => setLabId(e.target.value)}
                                >
                                    <option value="">Select Lab</option>
                                    {lab.map((lab) => (
                                        <option key={lab.id} value={lab.id}>
                                            {lab.lami}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Discipline:</label>
                                <select
                                    className="form-control"
                                    name="discipline"
                                    value={subjectId}
                                    onChange={(e) =>
                                        setSubjectId(e.target.value)
                                    }
                                >
                                    <option value="">Select Discipline</option>
                                    {professor.map((professor) => (
                                        <option
                                            key={professor.id}
                                            value={professor.id}
                                        >
                                            {professor.name}{" "}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Date:</label>
                                <Flatpickr
                                    className="form-control"
                                    name="date"
                                    value={date}
                                    onChange={(date) =>
                                        setDate(
                                            date[0].toISOString().split("T")[0]
                                        )
                                    }
                                    options={{
                                        dateFormat: "Y-m-d",
                                        minDate: "today",
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <label>Start Time:</label>
                                <Flatpickr
                                    className="form-control"
                                    name="startTime"
                                    value={timeInit}
                                    onChange={(time) =>
                                        setTimeInit(
                                            time[0]
                                                .toISOString()
                                                .split("T")[1]
                                                .slice(0, 5)
                                        )
                                    }
                                    options={{
                                        enableTime: true,
                                        noCalendar: true,
                                        dateFormat: "H:i",
                                        time_24hr: true,
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <label>End Time:</label>
                                <Flatpickr
                                    className="form-control"
                                    name="endTime"
                                    value={timeEnd}
                                    onChange={(time) =>
                                        setTimeEnd(
                                            time[0]
                                                .toISOString()
                                                .split("T")[1]
                                                .slice(0, 5)
                                        )
                                    }
                                    options={{
                                        enableTime: true,
                                        noCalendar: true,
                                        dateFormat: "H:i",
                                        time_24hr: true,
                                    }}
                                />
                            </div>

                            <button type="submit" className="btn btn-success">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default LabProfessor;
