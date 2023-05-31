import wsConnection from "../server";

export const api: Map<string,any> = new Map()
let messages:any = []

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
    let message = req.message;
    let id = req.id;
    if (message) {
      console.log(message);
      messages.push({id, message});
    }
    console.log("🚀 ~ file: ws.ts:21 ~ api.set ~ messages:", messages)
    return messages.map((obj:any) => obj.message)
})
