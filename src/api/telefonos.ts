import clienteAxios from "../config/axios";



export const getTelefonos = async() => {    
    try {
        const res = await clienteAxios.get("/telefonos")
        return res.data
    } catch (error) {
        console.log(error)
    }
}



export const createTelefono = async(data:any) => {
    try {
        const res = await clienteAxios.post("/create", data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}