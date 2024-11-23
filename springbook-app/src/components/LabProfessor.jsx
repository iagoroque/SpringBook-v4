import React, { useState, useEffect } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import Modal from "react-modal";
import bookingFetch from "../axios/BookingFetch";
import labFetch from "../axios/LabFetch";
import professorFetch from "../axios/ProfessorFetch";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../App.css";

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
                const response = await bookingFetch.get(
                    `/findByProfessor/${professorId}`
                );
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

            console.log("Enviado para aprovar.", response.data);
        } catch (error) {
            console.error(error);
        }

        setModalIsOpen(false);
        setRefresh((prev) => !prev);
    };

    return (
        <div className="main-container mt-5">
            <img src="/images/logo-blue.png" alt="Logo" className="logo" />
            <h2>Suas Reservas</h2>

            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Lab</th>
                            <th>Disciplina</th>
                            <th>Data & Hora</th>
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
            </div>
            <button
                id="btnreserve"
                className="btn-primary mb-3"
                onClick={() => setModalIsOpen(true)}
            >
                Reserve
            </button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Reserve Lab"
                className="custom-modal"
                overlayClassName="custom-overlay"
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Solicitar Reserva</h5>
                        <button
                            type="button"
                            className="close"
                            onClick={() => setModalIsOpen(false)}
                        >
                            <span id="x">&times;</span>
                        </button>
                    </div>
                    <div id="modalbody" className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Lab:</label>
                                <select
                                    className="form-control"
                                    name="lab"
                                    value={labId}
                                    onChange={(e) => setLabId(e.target.value)}
                                >
                                    <option value="">Selecione o Lab</option>
                                    {lab.map((lab) => (
                                        <option key={lab.id} value={lab.id}>
                                            {lab.lami}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Disciplina:</label>
                                <select
                                    className="form-control"
                                    name="discipline"
                                    value={subjectId}
                                    onChange={(e) =>
                                        setSubjectId(e.target.value)
                                    }
                                >
                                    <option value="">Selecione a Disciplina</option>
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
                                <label>Data:</label>
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
                                <label>Hora de Início:</label>
                                <Flatpickr
                                    className="form-control"
                                    name="startTime"
                                    value={timeInit}
                                    onChange={(time) =>
                                        setTimeInit(
                                            time[0].toLocaleTimeString(
                                                "en-GB",
                                                {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                }
                                            )
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
                                <label>Hora de Fim:</label>
                                <Flatpickr
                                    className="form-control"
                                    name="endTime"
                                    value={timeEnd}
                                    onChange={(time) =>
                                        setTimeEnd(
                                            time[0].toLocaleTimeString(
                                                "en-GB",
                                                {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                }
                                            )
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
                            <button
                                id="btnsubmit"
                                type="submit"
                                className="btn btn-success"
                            >
                                Solicitar
                            </button>
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default LabProfessor;
