import express from 'express';
import {json} from 'body-parser';

const app = express();
app.use(json());

app.get('/api/users/currentuser', (req, res) => {
    res.send('Hi there /api/users/currentuser');
})

const port = 3000;
app.listen(port, () => {
    console.log(`Auth Service Listening On Port : ${port}`)
})