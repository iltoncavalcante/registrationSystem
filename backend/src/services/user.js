import databaseConection from '../utils/database.js'
import User from '../models/user.js'
import bcrypt from 'bcrypt';

export const listUsers = async() =>{
    await databaseConection()
    return await User.find()
}

export const findUserById = async (userId) => {
    await databaseConection(); // Conecte ao banco de dados
    return await User.findOne({ _id: userId }); // Busca pelo campo _id
};

export const userExist = async (userId) => {
    await databaseConection();
    const user = await User.findOne({ _id: userId });
    return user ? true : false;
    
}

export const createUser = async(user) =>{
    await databaseConection()

    if (!user.email || !user.name) { //Verifica se há algum campo obrigatório faltando
        throw new Error('Dados obrigatórios ausentes');
    }

    const existingUser = await User.findOne({ email: user.email }) // Verifica existêndia do mesmo email
    if (existingUser){
        throw new Error("Email já cadastrado") //Dispara o erro de email já cadastrado
    }

    const createdUser = await User.create(user)
    return createdUser
}

export const deleteUser = async(id) =>{
    await databaseConection()
    await User.findByIdAndDelete(id)
}

export const updateUser = async (id, newBody) => {
    await databaseConection();

    // Verifica se a senha está no payload de atualização
    if (newBody.password) {
        const salt = await bcrypt.genSalt(10); // Gera o "sal"
        newBody.password = await bcrypt.hash(newBody.password, salt); // Encripta a nova senha
    }

    // Atualiza o usuário e retorna o documento atualizado
    return await User.findByIdAndUpdate(id, newBody, { new: true });
};
