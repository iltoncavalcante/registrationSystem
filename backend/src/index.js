import express from 'express';
import bodyParser from 'body-parser';
import userController from './controllers/user.js'; // Note o uso da extensão ".js"
import cors from 'cors';

const app = express();
app.use(cors());

const port = 3000;

app.use(bodyParser.json())

// app.get('/', (req, res) => {
//     res.send("Hello world!");
// });

app.use("/user", userController);

app.listen(port, () => {
    console.log(`App rodando em http://localhost:${port}`);
});
