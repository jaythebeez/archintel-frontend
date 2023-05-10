import Api from "./Api";
import ApiService from "./ApiService";
import axios from "axios";
import { AxiosError } from "axios";

interface ArticleFormData {
    image: string;
    title: string;
    link: string;
    date: Date;
    content: string;
}

export default class ArticleService extends ApiService{

    addArticle = async (formData: ArticleFormData) :Promise<boolean> => {
        return new Promise(async(resolve, reject)=>{
            try{
                const url = Api.addArticle("6450ffc5843f8e9732110bec");
                await axios.post(`${this.apiBase}${url}`, {...formData}, {withCredentials: true});
                resolve(true)
            } catch(e: unknown){
                const error = e as AxiosError;
                reject(error.message)
            }
        })
    }

    editArticle = async (formData: ArticleFormData, articleId: string) :Promise<boolean> => {
        return new Promise(async(resolve, reject)=>{
            try{
                const url = Api.editArticle(articleId);
                await axios.put(`${this.apiBase}${url}`, {...formData}, {withCredentials: true});
                resolve(true)
            } catch(e){
                const error = e as AxiosError;
                reject(error.message)
            }
        })
    }

    deleteArticle = async (articleId: string) :Promise<boolean> => {
        return new Promise(async(resolve, reject)=>{
            try{
                const url = Api.deleteArticle(articleId);
                await axios.delete(`${this.apiBase}${url}`, {withCredentials: true});
                resolve(true)
            } catch(e){
                const error = e as AxiosError;
                reject(error.message)
            }
        })
    }

    publishArticle = async (formData: ArticleFormData, articleId: string) :Promise<boolean> => {
        return new Promise(async(resolve, reject)=>{
            try{
                const url = Api.publishArticle(articleId);
                await axios.put(`${this.apiBase}${url}`,{...formData}, {withCredentials: true});
                resolve(true)
            } catch(e){
                const error = e as AxiosError;
                reject(error.message)
            }
        })
    }

    getAllArticles = async ():Promise<ArticleData []> => {
        return new Promise(async (resolve, reject)=>{
            try{
                const res = await axios.get(`${this.apiBase}${Api.getAllArticles}`, {withCredentials: true});
                return resolve(res.data)
            } catch(e){
                const error = e as AxiosError;
                reject(error.message)
            }
        })
    }

}