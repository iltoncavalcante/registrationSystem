import jwt from "jsonwebtoken";
import User from "../models/user.js"; // Importa o modelo de usuário
import databaseConection from "../utils/database.js"; // Conexão com o banco de dados

// Middleware para verificar se o usuário é um administrador
export const isAdmin = (req, res, next) => {
    // Verifica se o usuário é um administrador
    if (req.user.role !== 'adm') {
      // Se o papel não for 'adm', retorna um erro de acesso negado
      return res.status(403).send({ error: "Acesso negado. Somente administradores." });
    }
    // Se for administrador, continua com a requisição
    next();
  };


// Middleware para autenticação de usuário pelo token
export const authenticate = async (req, res, next) => {
  // Extrai o token do cabeçalho Authorization
  const authHeader = req.headers.authorization;

  // Verifica se o cabeçalho de autorização existe e se o token é fornecido com o prefixo "Bearer"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ error: "Token não fornecido ou inválido" });
  }

  // Extrai o token após o "Bearer "
  const token = authHeader.split(" ")[1];

  try {
    // Verifica a validade do token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // 'process.env.JWT_SECRET' é a chave secreta usada para assinar o token

    // Conecta ao banco de dados
    await databaseConection();

    // Verifica se o usuário associado ao token ainda existe
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).send({ error: "Usuário não encontrado" });
    }

    // Anexa as informações do usuário à requisição (req.user), para que possam ser usadas nas rotas subsequentes
    req.user = user;

    // Chama o próximo middleware ou a função de rota
    next();
  } catch (err) {
    // Em caso de erro, retorna um erro 401 (não autorizado)
    console.error("Erro ao verificar token:", err);
    res.status(401).send({ error: "Token inválido ou expirado" });
  }
};
