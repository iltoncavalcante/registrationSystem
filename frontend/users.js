const baseUrl = 'http://localhost:3000';
const apiUrl = `${baseUrl}/user`; // Definição correta

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

async function carregarUsuarios() {
    const token = localStorage.getItem('token');

    if (!token) {
        showPopup('Você precisa estar logado para acessar esta página.');
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
                <td>
                    <div class="action-btns">
                        <button class="delete-btn" data-id="${user.id}">Excluir</button>
                        <button class="update-btn" data-id="${user.id}">Atualizar</button>
                    </div>
                </td>
            `;
            userList.appendChild(row);
        });

        // Adiciona eventos aos botões (sem ação ainda)
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', () => {
                const userId = button.getAttribute('data-id');
                console.log(`Excluir usuário ${userId}`);
            });
        });

        document.querySelectorAll('.update-btn').forEach(button => {
            button.addEventListener('click', () => {
                const userId = button.getAttribute('data-id');
                console.log(`Atualizar usuário ${userId}`);
            });
        });

    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
        showPopup('Erro ao carregar usuários.');
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
