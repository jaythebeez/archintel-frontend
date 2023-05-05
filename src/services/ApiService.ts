import axios from "axios";
import Api from "./Api";

axios.defaults.withCredentials = true;

const development = process.env.NODE_ENV === "development" ? true : false;

const baseUrl = development ? "http://localhost:4000" : "https://goldfish-app-uf3cn.ondigitalocean.app";

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