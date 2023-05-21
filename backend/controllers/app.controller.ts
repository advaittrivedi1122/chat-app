import {Request, Response} from "express";

export class AppController{
    sendMessage = (req: Request, res: Response)=>{
        let message: string = req.body?.message
        let id: number = req.body?.id
        if (id && message) {
            console.log(id,message)
            res.status(200).json({id, message});
        }
        else{
            res.status(200).send({})
        }
    }
}