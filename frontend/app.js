// Seleciona os elementos do DOM
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const usernameInput = document.getElementById('username');

// URL base do backend
const baseUrl = 'http://localhost:3000';

function showPopup(message) {
    let popup = document.getElementById("popup");
    let overlay = document.getElementById("overlay");
    let messageElement = document.getElementById("popup-message");

    // Inserir a mensagem no popup
    messageElement.textContent = message;

    // Exibir o popup e o fundo escuro
    popup.style.display = "block";
    overlay.style.display = "block";

    // Fechar automaticamente após 3 segundos
    setTimeout(() => {
        popup.style.display = "none";
        overlay.style.display = "none";
    }, 3000);
}


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

        showPopup('Usuário cadastrado com sucesso!');
        await loginAutomatico(userData.email, userData.password);
    } catch (error) {
        showPopup('Erro: ' + error.message)
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
        showPopup('Erro no login automático: ' + error.message);
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
