import messages from "../model/messages";

export class Messages {
    
    saveMessage = async (from: string, to: string, message: string) => {
        try {
            const newMessage = await messages.create({
                from: from,
                to: to,
                message: message,
                createdAt: new Date()
            });
            return newMessage;
            
        } catch (error) {
            console.log("🚀 ~ Error  saving message - file: messages.ts:7 ~ saveMessage ~ error:", error)
            
        }
    }

}
