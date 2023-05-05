export default class Api {
    
    // accounts routes
    static loginUser = "/accounts/auth/login";
    static registerUser = "/accounts/auth/register";
    static logoutUser = "/accounts/auth/logout";


    // company routes
    static getAllCompanies = "/company/getAll";
    static getCompanyById = (id: string) => `/company/get/${id}`;
    static addCompany = "/company/add";
    static editCompany = (companyId: string) => `/company/edit/${companyId}`
    static deleteCompany = (companyId: string) => `/company/delete/${companyId}`

    // article routes
    static getAllArticles = "/articles/getAll";
    static addArticle = (companyId: string) => `/articles/add/${companyId}`;
    static editArticle = (articleId: string) => `/articles/edit/${articleId}`;
    static deleteArticle = (articleId: string) => `/articles/delete/${articleId}`;
    static publishArticle = (articleId: string) => `/articles/publish/${articleId}`;
    static getArticleById = (id: string) => `/articles/get/${id}`;


    // check api health
    static checkRoute = "/check"

}


