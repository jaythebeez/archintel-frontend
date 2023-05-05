import Api from "./Api";
import ApiService from "./ApiService";
import axios from "axios";


interface CompanyFormResponse extends CompanyData  {
    id: string;
}

export default class CompanyService extends ApiService{

    addCompany = async (formData:CompanyData) :Promise<boolean> => {
        return new Promise(async (resolve, reject)=>{
            try{
                await axios.post(`${this.apiBase}${Api.addCompany}`, {...formData}, {withCredentials: true});
                resolve(true)
            } catch(e){
                console.log(e)
                reject(e)
            }
        })
    }

    editCompany = async (formData:CompanyData, companyId: string) :Promise<boolean> => {
        return new Promise(async (resolve, reject)=>{
            try{
                const url = Api.editCompany(companyId)
                await axios.put(`${this.apiBase}${url}`, {...formData}, {withCredentials: true});
                resolve(true)
            } catch(e){
                console.log(e)
                reject(e)
            }
        })
    }

    deleteCompany = async (companyId: string) :Promise<boolean> => {
        return new Promise(async (resolve, reject)=>{
            try{
                const url = Api.deleteCompany(companyId)
                await axios.delete(`${this.apiBase}${url}`, {withCredentials: true});
                resolve(true)
            } catch(e){
                console.log(e)
                reject(e)
            }
        })
    }

    getAllCompanies = async ():Promise<CompanyFormResponse [] | Error> => {
        return new Promise(async (resolve, reject)=>{
            try{
                const res = await axios.get(`${this.apiBase}${Api.getAllCompanies}`, {withCredentials: true});
                resolve(res.data)
            } catch(e){
                reject(e)
            }
        })
    }

    getcompanyById = async (id: string) :Promise<CompanyFormResponse | Error> => {
        try{
            const url = Api.getCompanyById(id)
            const res = await axios.get(`${this.apiBase}${url}`, {withCredentials: true});
            return res.data
        } catch(e){
            return new Error()
        }
    }
}