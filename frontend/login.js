const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const baseUrl = 'https://registrationsystem-05r6.onrender.com';

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
        showPopup('Erro no login: ' + error.message);
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
