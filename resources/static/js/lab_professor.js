$(document).ready(function() {
    const labs = [
        { id: 1, name: "Lab A", available: true },
        { id: 2, name: "Lab B", available: false },
        { id: 3, name: "Lab C", available: true }
    ];

    const disciplines = ["Physics", "Chemistry", "Biology"];

    const reservations = [
        { id: 1, lab: "Lab A", discipline: "Physics", date: "2024-10-18", startTime: "10:00", endTime: "12:00", status: "Pending" },
        { id: 2, lab: "Lab C", discipline: "Biology", date: "2024-10-19", startTime: "14:00", endTime: "16:00", status: "Confirmed" }
    ];

    labs.forEach(function(lab) {
        if (lab.available) {
            $('#labSelect').append(`<option value="${lab.id}">${lab.name}</option>`);
        }
    });

    disciplines.forEach(function(discipline) {
        $('#disciplineSelect').append(`<option value="${discipline}">${discipline}</option>`);
    });

    flatpickr("#dateSelect", {
        dateFormat: "Y-m-d",
        minDate: "today"
    });

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

    function loadReservations() {
        $('#reservationList').empty();
        reservations.forEach(function(reservation, index) {
            $('#reservationList').append(`
                <tr>
                    <td>${index + 1}</td>
                    <td>${reservation.lab}</td>
                    <td>${reservation.discipline}</td>
                    <td>${reservation.date} ${reservation.startTime} - ${reservation.endTime}</td>
                    <td>${reservation.status}</td>
                </tr>
            `);
        });
    }
    
    loadReservations();

    $('#openModal').click(function() {
        $('#labModal').modal('show');
    });

    $('#labBookingForm').on('submit', function(e) {
        e.preventDefault();

        const selectedLab = $('#labSelect').val();
        const selectedDiscipline = $('#disciplineSelect').val();
        const selectedDate = $('#dateSelect').val();
        const selectedStartTime = $('#startTime').val();
        const selectedEndTime = $('#endTime').val();
        const newReservation = {
            id: reservations.length + 1,
            lab: labs.find(lab => lab.id == selectedLab).name,
            discipline: selectedDiscipline,
            date: selectedDate,
            startTime: selectedStartTime,
            endTime: selectedEndTime,
            status: "Pending"
        };

        reservations.push(newReservation);
        loadReservations();
        $('#messageArea').text("Lab reserved successfully!").addClass('success').show();
        $('#labModal').modal('hide');
    });
});
