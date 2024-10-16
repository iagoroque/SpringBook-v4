$(document).ready(function() {
    const labs = [
        { id: 1, name: "Lab A", available: true },
        { id: 2, name: "Lab B", available: false },
        { id: 3, name: "Lab C", available: true }
    ];

    const disciplines = ["Physics", "Chemistry", "Biology"];

    const reservations = [
        { id: 1, lab: "Lab A", discipline: "Physics", professor: "Osvaldo", date: "2024-10-18", startTime: "10:00", endTime: "12:00" },
        { id: 2, lab: "Lab C", discipline: "Biology", professor: "Elton", date: "2024-10-19", startTime: "14:00", endTime: "16:00" }
    ];

    // Popula a lista de laboratórios disponíveis
    labs.forEach(function(lab) {
        if (lab.available) {
            $('#labSelect').append(`<option value="${lab.id}">${lab.name}</option>`);
        }
    });

    // Popula a lista de disciplinas
    disciplines.forEach(function(discipline) {
        $('#disciplineSelect').append(`<option value="${discipline}">${discipline}</option>`);
    });

    // Configura o calendário para seleção de data
    flatpickr("#dateSelect", {
        dateFormat: "Y-m-d",
        minDate: "today"
    });

    // Configura os campos de horário de início e término
    flatpickr("#startTime", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true
    });

    flatpickr("#endTime", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true
    });

    // Carrega as reservas existentes
    function loadReservations() {
        $('#reservationList').empty();
        reservations.forEach(function(reservation, index) {
            $('#reservationList').append(`
                <tr>
                    <td>${index + 1}</td>
                    <td>${reservation.lab}</td>
                    <td>${reservation.discipline}</td>
                    <td>${reservation.professor}</td> <!-- Corrigido aqui -->
                    <td>${reservation.date} ${reservation.startTime} - ${reservation.endTime}</td>
                </tr>
            `);
        });
    }

    loadReservations();

    // Abre o modal para reserva de laboratório
    $('#openModal').click(function() {
        window.location.href = "/resources/templates/html/login.html";
    });

    // Evento de submissão do formulário de reserva
    $('#labBookingForm').on('submit', function(e) {
        e.preventDefault(); // Evita o comportamento padrão do formulário

        // Redireciona para a página de login
        window.location.href = "/resources/templates/html/login.html";
    });
});
