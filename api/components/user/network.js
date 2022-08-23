import { Router } from 'express';
const router = Router();
import secure from './secure.js'
import { success, error } from '../../../network/response.js';
import controller from './index.js';


router.get('/', (req,res)=>{
    const lista = controller.list()
    .then((lista)=>{
        success(req,res,lista,500)
    })
    .catch(err=>{
        error(req,res,err.message,500)
    })
})

router.get('/:id', (req,res)=>{
    controller.get(req.params.id)
    .then((user)=>{
        success(req,res,user,500)
    })
    .catch(err=>{
        error(req,res,err.message,500)
    })
})


router.post('/',(req,res)=>{
    controller.upsert(req.body)
    .then((user) => {
        success(req, res, user, 201);
    })
    .catch((err) => {
        error(req, res, err.message, 500);
    });

})

router.put('/',secure('update'),(req,res)=>{
    controller.upsert(req.body)
    .then((user) => {
        success(req, res, user, 201);
    })
    .catch((err) => {
        error(req, res, err.message, 500);
    });

})


export default router;