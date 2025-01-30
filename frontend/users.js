const baseUrl = 'https://registrationsystem-05r6.onrender.com';
const apiUrl = `${baseUrl}/user`; // Definição correta

async function carregarUsuarios() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar usuários.');
        }

        const usuarios = await response.json();
        const userList = document.getElementById('user-list');
        userList.innerHTML = '';

        usuarios.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
            `;
            userList.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
        alert('Erro ao carregar usuários.');
    }
}

// Carregar usuários ao iniciar a página
window.onload = carregarUsuarios;

// Botão de logout
const logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    });
}
