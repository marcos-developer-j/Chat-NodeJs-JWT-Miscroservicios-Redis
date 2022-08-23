import { Router } from 'express';
const router = Router();
import { success, error } from '../../../network/response.js';
import controller from './index.js';

router.post('/login', (req,res)=>{
    controller.login(req.body.username,req.body.password)
    .then(token=>{
        success(req,res,token,200)
    })
    .catch(e=>{
        error(req,res,e,400)
    })
})



export default router