import Users from "../model/users";

export const createUser = async (username:string, password: string, isLoggedIn: boolean|undefined) => {
    try{
        const newUser = await Users.create({
            username: username,
            password: password,
            isLoggedIn: isLoggedIn || false
        });
        return newUser;
    }
    catch(error){
        console.error("🚀 ~ Error creating user - file: Users.ts:12 ~ createUser ~ error:", error)
        
    }
};

// let user = createUser
// .then((user) => {
//     return user;
// 	}
// )
// .catch((error) => {
//     console.log("🚀 ~ Error creating user - file: Users.ts:13 ~ error:", error);
//     return ;
// 	}
// )
// console.log("🚀 ~ file: Users.ts:19 ~ user:", user)

