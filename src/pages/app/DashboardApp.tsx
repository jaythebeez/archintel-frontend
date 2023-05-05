import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import AppContainer from "../../components/layout/AppContainer";
import Dashboard from "./Dashboard/Dashboard";
import Media from "./Media/Media";
import Settings from "./Settings/Settings";
import ArticleService from "../../services/ArticleService";
import CompanyService from "../../services/CompanyService";
import { addAllArticles } from "../../store/reducers/articlesReducer";
import { addAllCompanies } from "../../store/reducers/companyReducer";

const DashboardApp = () =>{

    const navigate = useNavigate();
    const {user} = useAppSelector((state)=>state);
    const dispatch = useAppDispatch()

    const addArticlesToState = async () => {
        try{
            const articleService = new ArticleService();
            const articles = await articleService.getAllArticles();
            dispatch(addAllArticles(articles))
            console.log({articles})
        } catch(e){
            console.log(e)
        }
    }

    const addCompaniesToState = async () => {
        try{
            const companyService = new CompanyService();
            const companies = await companyService.getAllCompanies();
            dispatch(addAllCompanies(companies));
            console.log({companies})
        } catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        if(!user.isAuthenticated) navigate("/login");
    },[user])

    useEffect(()=>{
        addArticlesToState();
        addCompaniesToState()
    },[user])

    const refresh = () => {addArticlesToState(); addCompaniesToState()}

    return(
        <AppContainer>
            <Routes>
                <Route path="/" element={<Dashboard refresh={()=>refresh()} />} />
                <Route path="/media" element={<Media refresh={()=>refresh()} />} />
                <Route path="/settings" element={<Settings refresh={()=>refresh()} />} />
            </Routes>
        </AppContainer>
    )
}

export default DashboardApp;