import axios from "axios";
import Api from "./Api";

axios.defaults.withCredentials = true;

export default class ApiService {
    protected apiBase = "https://goldfish-app-uf3cn.ondigitalocean.app";

    check = async () => {
        try{
            const res = await axios.get(`${this.apiBase}${Api.checkRoute}`);
            return true
        } catch(e){
            return false
        }
    }
}