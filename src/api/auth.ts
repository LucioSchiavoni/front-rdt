import clienteAxios from "../config/axios";
import { isAxiosError } from "axios";


export const loginRequest = async ( userData: {username: string, password: string}) => {
    try { 
        const response =  await clienteAxios.post("/login", userData)
        return response
    } catch (error) {
            if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }

}



export const auth = async() => {
    try {
        const res = await clienteAxios.get("/auth")
        return res.data
    } catch (error) {
        console.log("Error del api auth: ", error)        
    }
}

export const registerRequest = async(data:any): Promise<any> => {
    try {
        const res = await clienteAxios.post("/register", data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const changePassword = async (id: number, password: string): Promise<any> => {
  try {
    const res = await clienteAxios.put(`/changePassword/${id}`, { password: password });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};


export const getUsers = async() => {
    try {
        const res = await clienteAxios.get("/users")
        return res.data        
    } catch (error) {
        console.log(error)
    }
}