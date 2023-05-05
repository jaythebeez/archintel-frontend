import Api from "./Api";
import ApiService from "./ApiService";
import axios from "axios";

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
                const res = await axios.post(`${this.apiBase}${url}`, {...formData}, {withCredentials: true});
                resolve(true)
            } catch(e){
                console.log(e)
                reject(false)
            }
        })
    }

    editArticle = async (formData: ArticleFormData, articleId: string) :Promise<boolean> => {
        return new Promise(async(resolve, reject)=>{
            try{
                const url = Api.editArticle(articleId);
                const res = await axios.put(`${this.apiBase}${url}`, {...formData}, {withCredentials: true});
                resolve(true)
            } catch(e){
                console.log(e)
                reject(false)
            }
        })
    }

    deleteArticle = async (articleId: string) :Promise<boolean> => {
        return new Promise(async(resolve, reject)=>{
            try{
                const url = Api.deleteArticle(articleId);
                const res = await axios.delete(`${this.apiBase}${url}`, {withCredentials: true});
                resolve(true)
            } catch(e){
                console.log(e)
                reject(false)
            }
        })
    }

    publishArticle = async (formData: ArticleFormData, articleId: string) :Promise<boolean> => {
        return new Promise(async(resolve, reject)=>{
            try{
                const url = Api.publishArticle(articleId);
                const res = await axios.put(`${this.apiBase}${url}`,{...formData}, {withCredentials: true});
                resolve(true)
            } catch(e){
                console.log(e)
                reject(false)
            }
        })
    }

    getAllArticles = async ():Promise<ArticleData []> => {
        return new Promise(async (resolve, reject)=>{
            try{
                const res = await axios.get(`${this.apiBase}${Api.getAllArticles}`, {withCredentials: true});
                return resolve(res.data)
            } catch(e){
                console.log(e)
                reject("Unable to get Articles")
            }
        })
    }

    getArticleById = async (id: string) :Promise<ArticleData | Error> => {
        try{
            const url = Api.getArticleById(id)
            const res = await axios.get(`${this.apiBase}${url}`, {withCredentials: true});
            return res.data
        } catch(e){
            return new Error()
        }
    }
}