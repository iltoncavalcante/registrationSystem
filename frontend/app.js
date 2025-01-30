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

    // Obtém os valores dos inputs
    const userData = {
        name: nameInput.value,
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
    };

    try {
        // Faz a requisição para cadastrar o usuário
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

        // Após o cadastro, faz login automaticamente
        await loginAutomatico(userData.email, userData.password);
    } catch (error) {
        alert('Erro: ' + error.message);
    }
}

// Função para login automático após cadastro
async function loginAutomatico(email, password) {
    const url = `${baseUrl}/user/login`; // Endpoint de login

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
        localStorage.setItem('token', data.token); // Salva o token no localStorage

        window.location.href = 'users.html'; // Redireciona para a aba de usuários
    } catch (error) {
        alert('Erro no login automático: ' + error.message);
    }
}

// Adiciona evento ao botão de cadastro
const submitButton = document.getElementById('submitbutton');
if (submitButton) {
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        cadastrarUsuario();
    });
}

// Botão para ir para a aba de login
const usersButton = document.getElementById('users-btn');
if (usersButton) {
    usersButton.addEventListener('click', () => {
        window.location.href = 'login.html';
    });
}

// Botão de login
const loginButton = document.getElementById('loginBtn');
if (loginButton) {
    loginButton.addEventListener('click', () => {
        window.location.href = 'login.html';
    });
}
