// Seleciona os elementos do DOM
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const usernameInput = document.getElementById('username')

// Função para cadastrar o usuário
async function cadastrarUsuario() {
    const url = 'http://localhost:3000/user'; // Altere para a URL correta do backend

    // Obtém os valores dos inputs
    const userData = {
        name: nameInput.value, // Pega o valor do campo 'Name'
        username: usernameInput.value,
        email: emailInput.value, // Pega o valor do campo 'Email'
        password: passwordInput.value, // Pega o valor do campo 'Senha'
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
            },
            body: JSON.stringify(userData), // Converte o objeto em JSON
        });

        if (response.ok) {
            const data = await response.json();
            //console.log('Usuário cadastrado!');
            alert('Usuário cadastrado!')
            window.location.href = 'users.html';
        } else {
            const error = await response.text();
            //console.error('Erro ao cadastrar usuário:', error);
            alert('Erro ao cadastrar usuário:' + error.message)
        }
    } catch (error) {
        //console.error('Erro na requisição:', error);
        alert('Erro na requisição:' + error.message)
    }
}

// Opcional: Adicionar evento ao botão de envio
const submitButton = document.getElementById('submitbutton'); // Id do botão no HTML
if (submitButton) {
    submitButton.addEventListener('click', (event) => {
        event.preventDefault(); // Evita o comportamento padrão do formulário
        cadastrarUsuario();
    });
}

const usersButton = document.getElementById('users-btn');
if (usersButton){
    usersButton.addEventListener('click', () => {
        window.location.href = 'users.html';
    })
}