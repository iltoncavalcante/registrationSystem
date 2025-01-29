import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userRules = ['adm', 'usuario']

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, default: 0, min: 0 },
    createdAt: { type: Date, default: Date.now },
    role: { type: String, enum: userRules, default: 'usuario'},
});

// Middleware para hashear a senha antes de salvar
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // Evita rehash se a senha não foi alterada

    try {
        const salt = await bcryptjs.genSalt(10); // Gera o "sal" para o hash
        this.password = await bcryptjs.hash(this.password, salt); // Hashea a senha
        next();
    } catch (error) {
        next(error);
    }
});

// Método para comparar a senha do usuário com o hash armazenado
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcryptjs.compare(candidatePassword, this.password);
};

// Exporta o modelo
export default mongoose.models.User || mongoose.model("User", UserSchema);
