import axios from "axios";
import Api from "./Api";

const cookie = document.cookie.split("=")[1];
console.log(cookie)

axios.defaults.withCredentials = true;
axios.defaults.headers.common["Authorization"] = `JWT ${cookie}`

// const development = process.env.NODE_ENV === "development" ? true : false;

const baseUrl = "https://goldfish-app-uf3cn.ondigitalocean.app";
// const baseUrl = "http://localhost:4000";

export default class ApiService {
    protected apiBase = baseUrl;

    check = async () => {
        try{
            await axios.get(`${this.apiBase}${Api.checkRoute}`);
            return true
        } catch(e){
            return false
        }
    }
}