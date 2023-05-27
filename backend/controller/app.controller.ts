import {Request, Response} from "express";
import * as Users from "../service/Users";

export class AppController{

    sendMessage = (req: Request, res: Response)=>{
        let message: string = req.body?.message;
        let id: number = req.body?.id;
        if (id && message) {
            console.log(id,message);
            res.status(200).json({id, message});
        }
        else{
            res.status(200).send({});
        }
    }

    register = async (req: Request, res: Response)=>{
        const username: string = req.body.username;
        const password: string = req.body.password;
        const isLoggedIn: boolean = req.body.isLoggedIn || false;
        let newUser = await Users.createUser(username, password, isLoggedIn);
        console.log("🚀 ~ file: app.controller.ts:20 ~ AppController ~ register= ~ newUser:", newUser);
        res.status(200).json({newUser})
    }

}