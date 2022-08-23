import express, { json, urlencoded } from 'express';
import config from '../config.js';
const app =express()
import user from './components/user/network.js';
import auth from './components/auth/network.js';

app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/api/user',user)
app.use('/api/auth',auth)



app.listen(config.api.port, () =>{
    console.log('Escuchando en el puerto '+config.api.port)
})