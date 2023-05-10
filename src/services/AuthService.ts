import Api from "./Api";
import ApiService from "./ApiService";
import axios from "axios";

interface UserLoginFormData{
    email: string;
    password:string;
}

export interface UserRegisterFormData{
    email: string;
    firstName: string;
    lastName: string;
    type: 'Writer' | 'Editor';
    status: 'Active' | 'Inactive';
    password: string
}

export default class AuthService extends ApiService{

    loginUser = async ({email, password} :UserLoginFormData) :Promise<UserData> => {
        return new Promise(async (resolve, reject)=>{
            try{
                const res = await axios.post(`${this.apiBase}${Api.loginUser}`, {email, password}, {withCredentials: true})
                console.log(res)
                resolve(res.data)
            } catch(e){
                console.log(e);
                reject("Unable to Login User")
            }
        })
    }

    registerUser = async (userData :UserRegisterFormData): Promise<{ok: true}> => {
        return new Promise(async (resolve, reject)=>{
            try{
                const res = await axios.post(`${this.apiBase}${Api.registerUser}`, {...userData}, {withCredentials: true})
                resolve(res.data)
            } catch(e){
                console.log(e)
                reject("Unable to register user")
            }
        })
    }

    logoutUser = async () :Promise<{ok: true}> => {
        return new Promise(async (resolve, reject)=>{
            try{
                const res = await axios.get(`${this.apiBase}${Api.logoutUser}`, {withCredentials: true})
                resolve(res.data)
            } catch(e){
                reject("Unable to logout user")
            }
        })
    }
}