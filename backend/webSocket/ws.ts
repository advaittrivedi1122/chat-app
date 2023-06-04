import wsConnection from "../server";
import {Messages} from "../service/Messages";

const messages = new Messages()

export const api: Map<string,any> = new Map()
let messagesArr:any = []

export const handleMessage = async (req:any) => {
    if (api.has(req.method)){
        console.log("🚀 ~ file: ws.ts:7 ~ handleMessage ~ method:", req.method)
        let fnc = api.get(req.method);
        let res = await fnc(req)
        return JSON.stringify(res)
        // return res
    }
}

api.set("send-message", async (req:any) => {
    let message = req.params.message;
    let userId = req.params.from;
    if (message) {
      console.log(message);
      await messages.saveMessage(req.params.from, req.params.to, req.params.message)
      messagesArr.push({userId, message});
    }
    console.log("🚀 ~ file: ws.ts:21 ~ api.set ~ messages:", messages)
    return messagesArr
})

api.set("get-chats", async (req:any) => {
    let chats: number = req.params.withUser;
})
