import {Request, Response} from "express";
import * as Users from "../service/Users";
import {Messages} from "../service/Messages";

const messages = new Messages();

export class AppController{

    saveMessage = (req: Request, res: Response)=>{
        let {
            from,
            to, 
            message,
        } : any = req.body
        if (typeof from !== 'string' || typeof to !== 'string' || typeof message !== 'string') {
            throw new Error("Invalid parameters in saveMessage")
        }
        if (from && message) {
            console.log(from,message);
            messages.saveMessage(from, to, message)
            res.status(200).json({from ,to , message, success: true});
        }
        else{
            res.status(200).send({success: false});
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