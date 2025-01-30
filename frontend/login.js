const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// URL base do backend
const baseUrl = 'https://registrationsystem-05r6.onrender.com';

async function loginUsuario() {
    const url = `${baseUrl}/user/login`; // Endpoint correto do backend

    // Obtém os valores dos inputs
    const userData = {
        email: emailInput.value,
        password: passwordInput.value,
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Erro ao entrar no sistema.');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token); // Salva o token no localStorage

        //alert('Login efetuado com sucesso!');
        window.location.href = 'users.html'; // Redireciona para a página de usuários
    } catch (error) {
        alert('Erro no login: ' + error.message);
    }
}

// Adiciona evento ao botão de login
const submitButton = document.getElementById('loginbutton');
if (submitButton) {
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        loginUsuario();
    });
}

// Botão para ir para a aba de cadastro
const cadastroButton = document.getElementById('cadastroBtn');
if (cadastroButton) {
    cadastroButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}
