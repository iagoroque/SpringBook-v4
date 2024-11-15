$(document).ready(function() {
    // Dados simulados para reservas pendentes e aprovadas
    const pendingBookings = [
        { id: 1, lab: "Lab A", discipline: "Physics", startDateTime: "2024-10-18 10:00", endDateTime: "2024-10-18 11:00", professor: "Dr. Smith" },
        { id: 2, lab: "Lab B", discipline: "Chemistry", startDateTime: "2024-10-19 12:00", endDateTime: "2024-10-19 13:00", professor: "Dr. Johnson" }
    ];

    const approvedBookings = [
        { id: 3, lab: "Lab C", discipline: "Biology", startDateTime: "2024-10-20 14:00", endDateTime: "2024-10-20 15:00", professor: "Dr. Adams" }
    ];

    // Carregar reservas pendentes
    function loadPendingBookings() {
        $('#pendingBookingList').empty();
        pendingBookings.forEach(function(booking, index) {
            const date = booking.startDateTime.split(" ")[0];
            const startTime = booking.startDateTime.split(" ")[1];
            const endTime = booking.endDateTime.split(" ")[1];

            $('#pendingBookingList').append(`
                <tr>
                    <td>${index + 1}</td>
                    <td>${booking.lab}</td>
                    <td>${booking.discipline}</td>
                    <td>${date} ${startTime} - ${endTime}</td>
                    <td>${booking.professor}</td>
                    <td>
                        <i class="fas fa-check-circle text-success approveBooking" style="cursor:pointer;" data-id="${booking.id}"></i>
                        <i class="fas fa-trash-alt text-danger deleteBooking" style="cursor:pointer; margin-left: 10px;" data-id="${booking.id}"></i>
                    </td>
                </tr>
            `);
        });
    }

    // Carregar reservas aprovadas
    function loadApprovedBookings() {
        $('#approvedBookingList').empty();
        approvedBookings.forEach(function(booking, index) {
            const date = booking.startDateTime.split(" ")[0];
            const startTime = booking.startDateTime.split(" ")[1];
            const endTime = booking.endDateTime.split(" ")[1];

            $('#approvedBookingList').append(`
                <tr>
                    <td>${index + 1}</td>
                    <td>${booking.lab}</td>
                    <td>${booking.discipline}</td>
                    <td>${date} ${startTime} - ${endTime}</td>
                    <td>${booking.professor}</td>
                    <td>
                        <i class="fas fa-trash-alt text-danger deleteBooking" style="cursor:pointer;" data-id="${booking.id}"></i>
                    </td>
                </tr>
            `);
        });
    }

    // Inicializa a página com reservas pendentes
    loadPendingBookings();

    // Alternar entre solicitações pendentes e aprovadas
    $('#pendingTab').click(function() {
        $('#pendingRequests').show();
        $('#approvedRequests').hide();
        $('#pendingTab').addClass('active');
        $('#approvedTab').removeClass('active');
    });

    $('#approvedTab').click(function() {
        $('#approvedRequests').show();
        $('#pendingRequests').hide();
        $('#approvedTab').addClass('active');
        $('#pendingTab').removeClass('active');
        loadApprovedBookings();
    });

    // Aprovar reserva (mover de pendente para aprovado)
    $(document).on('click', '.approveBooking', function() {
        const bookingId = $(this).data('id');
        const bookingIndex = pendingBookings.findIndex(b => b.id === bookingId);

        if (bookingIndex !== -1) {
            const approvedBooking = pendingBookings.splice(bookingIndex, 1)[0];
            approvedBookings.push(approvedBooking);
            loadPendingBookings();
            alert(`Booking for ${approvedBooking.lab} approved!`);
        }
    });

    // Excluir reserva (de pendente ou aprovada)
    $(document).on('click', '.deleteBooking', function() {
        const bookingId = $(this).data('id');
        
        // Excluir primeiro das reservas pendentes
        let bookingIndex = pendingBookings.findIndex(b => b.id === bookingId);
        if (bookingIndex !== -1) {
            pendingBookings.splice(bookingIndex, 1);
            loadPendingBookings();
            alert(`Pending booking with ID ${bookingId} deleted!`);
        } else {
            // Excluir das reservas aprovadas
            bookingIndex = approvedBookings.findIndex(b => b.id === bookingId);
            if (bookingIndex !== -1) {
                approvedBookings.splice(bookingIndex, 1);
                loadApprovedBookings();
                alert(`Approved booking with ID ${bookingId} deleted!`);
            }
        }
    });
});
