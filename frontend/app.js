// Seleciona os elementos do DOM
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const usernameInput = document.getElementById('username');

// URL base do backend
const baseUrl = 'https://registrationsystem-05r6.onrender.com';

// Função para cadastrar o usuário
async function cadastrarUsuario() {
    const url = `${baseUrl}/user`; // Endpoint para cadastro

    const userData = {
        name: nameInput.value,
        username: usernameInput.value,
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
            throw new Error(errorText || 'Erro ao cadastrar usuário.');
        }

        alert('Usuário cadastrado com sucesso!');
        await loginAutomatico(userData.email, userData.password);
    } catch (error) {
        alert('Erro: ' + error.message);
    }
}

// Função para login automático após cadastro
async function loginAutomatico(email, password) {
    const url = `${baseUrl}/user/login`; // Corrigido o endpoint

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Falha ao fazer login após cadastro.');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);

        window.location.href = 'users.html';
    } catch (error) {
        alert('Erro no login automático: ' + error.message);
    }
}

// Evento no botão de cadastro
const submitButton = document.getElementById('submitbutton');
if (submitButton) {
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        cadastrarUsuario();
    });
}

// Botão para login
const loginButton = document.getElementById('loginBtn');
if (loginButton) {
    loginButton.addEventListener('click', () => {
        window.location.href = 'login.html';
    });
}
