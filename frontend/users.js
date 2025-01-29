const apiUrl = 'http://localhost:3000/user'; 

async function carregarUsuarios() {
    try {
        const response = await fetch(apiUrl);
        const usuarios = await response.json();

        const userList = document.getElementById('user-list');
        userList.innerHTML = ''; // Limpa a lista antes de adicionar novos elementos

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
        alert('Erro ao carregar usuários!');
    }
}

// Chama a função quando a página carrega
window.onload = carregarUsuarios;

const cadastroButton = document.getElementById('cadastroButton');
if (cadastroButton){
    cadastroButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    })
}
