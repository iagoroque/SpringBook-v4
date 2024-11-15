$(document).ready(function() {
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        const username = $('#username').val();
        const password = $('#password').val();

        if (username && password) {
            // Simula o processo de login (a ser conectado com o backend)
            alert("Login successful!");
            window.location.href = "/resources/templates/html/lab_professor.html"; // Redireciona para a página de reservas após o login
            // TODO: corrigir para redirecionar de acordo com o tipo/autoridade do usuário
        } else {
            alert("Please fill in all fields.");
        }
    });
});
