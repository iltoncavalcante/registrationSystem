const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const baseUrl = 'https://registrationsystem-05r6.onrender.com';

async function loginUsuario() {
    const url = `${baseUrl}/user/login`; // Corrigida a URL

    const userData = {
        email: emailInput.value,
        password: passwordInput.value,
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Erro ao entrar no sistema.');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);

        window.location.href = 'users.html';
    } catch (error) {
        alert('Erro no login: ' + error.message);
    }
}

// Evento no botão de login
const submitButton = document.getElementById('loginbutton');
if (submitButton) {
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        loginUsuario();
    });
}

// Botão para cadastro
const cadastroButton = document.getElementById('cadastroBtn');
if (cadastroButton) {
    cadastroButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}
