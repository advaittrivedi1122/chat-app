import {Request, Response} from "express";

export const sendMessage = (req: Request, res: Response)=>{
    let response: string = req.body?.message ? req.body.message : "No messages"
    console.log(response)
    res.status(200).json(response);
}