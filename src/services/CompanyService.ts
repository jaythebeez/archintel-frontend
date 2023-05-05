import Api from "./Api";
import ApiService from "./ApiService";
import axios from "axios";


interface CompanyFormResponse extends CompanyData  {
    id: string;
}

export default class CompanyService extends ApiService{

    addCompany = async (formData:CompanyData) :Promise<boolean | Error> => {
        try{
            const res = await axios.post(`${this.apiBase}${Api.addCompany}`, {...formData});
            return true
        } catch(e){
            return new Error()
        }
    }

    getAllCompanies = async ():Promise<CompanyFormResponse [] | Error> => {
        try{
            const res = await axios.get(`${this.apiBase}${Api.getAllCompanies}`);
            return res.data
        } catch(e){
            return new Error()
        }
    }

    getcompanyById = async (id: string) :Promise<CompanyFormResponse | Error> => {
        try{
            const url = Api.getCompanyById(id)
            const res = await axios.get(`${this.apiBase}${url}`);
            return res.data
        } catch(e){
            return new Error()
        }
    }
}