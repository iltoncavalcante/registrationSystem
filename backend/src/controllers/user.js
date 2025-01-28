import { Router } from "express";
import { listUsers, findUserById, createUser, deleteUser, updateUser, userExist } from "../services/user.js";
import databaseConection from "../utils/database.js";
import User from '../models/user.js'
import dotenv from "dotenv";
import { isAdmin, authenticate } from "../middlewares/auth.js";
import { generateToken } from "../helpers/jwt.js";

dotenv.config()

const router = Router()

router.get ('/',authenticate ,async(req, res) => {
    try{
        const user_id = req.user._id
        const user = await findUserById(user_id)
        res.status(200).send(user)
    }catch(err){
        console.error("Erro ao buscar usuário:", err);
        res.status(500).send({error: "Erro interno do servidor ao buscar usuários", details: err.message})
    }
    
})

router.get("/adm", authenticate, isAdmin, async (req, res) => {
    try {
      const userList = await listUsers(); // Obtém a lista de usuários
      res.status(200).send(userList); // Retorna a lista de usuários
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
      res.status(500).send({ error: "Erro interno ao buscar usuários" });
    }
  });

router.post('/', async (req, res) => {
    try {
        const user = await createUser(req.body);
        res.status(201).send(user); // Usuário criado com sucesso
    } catch (err) {
        if (err.message === 'Email já cadastrado') {
            res.status(409).send("O email já possui cadastro"); // Conflict
        } else if (err.message === 'Dados obrigatórios ausentes') {
            res.status(400).send("Dados obrigatórios ausentes"); // Bad Request
        } else {
            res.status(500).send("Erro interno no servidor"); // Internal Server Error
        }
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).send({ error: "Email e senha são obrigatórios" });
    }
  
    try {
      await databaseConection();
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send({ error: "Usuário não encontrado" });
      }
  
      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return res.status(401).send({ error: "Senha inválida" });
      }
  
      // Chama a função do helper
      const token = generateToken({ id: user._id, role: user.role });
  
      res.status(200).send({ token });
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      res.status(500).send({ error: "Erro interno do servidor" });
    }
  });

router.put('/', authenticate, async(req, res) => {
    try{
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send({ error: "Corpo da requisição está vazio" });
        }

        const updatedUser = await updateUser(req.user._id, req.body)

        if (!updatedUser) {
            return res.status(404).send({ error: "Usuário não encontrado" });
        }
        res.status(200).send(updatedUser)

    }catch(err){
        if(err.name == "CastError") return res.status(400).send({ error: "ID de usuário inválido" })
        console.error("Erro ao atulaiza o usuário:", err);
        res.status(500).send({ error : "Erro interno no servidor" })
    }
})

router.delete('/',authenticate , async(req, res) => {
    try{

        const { _id } = req.user._id;

      // Valida se o _id foi fornecido
      if (!_id) {
          return res.status(400).send("ID do usuário não fornecido corretamente");
      }

      // Verifica se o usuário existe
      const userExists = await userExist(_id); // Garante que é aguardado
      if (!userExists) {
          return res.status(404).send("Usuário inexistente");
      }

      // Remove o usuário
      await deleteUser(_id);

      // Resposta de sucesso
      return res.status(200).send("Usuário deletado com sucesso");

    }catch(err){
        res.status(400).send("O Ususário não pode ser deletado")
    }
    
})

router.delete('/adm', authenticate, isAdmin, async (req, res) => {
  try {
      const { _id } = req.body; // Extrai o _id do corpo da requisição

      // Valida se o _id foi fornecido
      if (!_id) {
          return res.status(400).send("ID do usuário não fornecido");
      }

      // Verifica se o usuário existe
      const userExists = await userExist(_id); // Garante que é aguardado
      if (!userExists) {
          return res.status(404).send("Usuário inexistente");
      }

      // Remove o usuário
      await deleteUser(_id);

      // Resposta de sucesso
      return res.status(200).send("Usuário deletado com sucesso");
  } catch (err) {
      console.error("Erro ao deletar o usuário:", err.message);
      return res.status(500).send("Erro interno: O usuário não pode ser deletado");
  }
});


export default router