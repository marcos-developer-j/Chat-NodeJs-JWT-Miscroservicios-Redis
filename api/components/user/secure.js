import auth from "../../../auth/index.js";

export default function checkAuth(action){
    function middelware(req,res,next){
        switch(action){
            case 'update':
                const owner = req.body.id;
                auth.check.own(req,owner)
                next()
                break;
            default:
                next();
        }
    }
    return middelware
}