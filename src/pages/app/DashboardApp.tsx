import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import AppContainer from "../../components/layout/AppContainer";
import Dashboard from "./Dashboard/Dashboard";
import Media from "./Media/Media";
import Settings from "./Settings/Settings";
import ArticleService from "../../services/ArticleService";
import { addAllArticles } from "../../store/reducers/articlesReducer";

const DashboardApp = () =>{

    const navigate = useNavigate();
    const {user} = useAppSelector((state)=>state);
    const dispatch = useAppDispatch()

    const addArticlesToState = async () => {
        try{
            const articleService = new ArticleService();
            const articles = await articleService.getAllArticles();
            if(Array.isArray(articles)) {
                console.log(articles);
                dispatch(addAllArticles(articles))
            }
        } catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        if(!user.isAuthenticated) navigate("/login");
    },[user])

    useEffect(()=>{
        addArticlesToState()
    },[user])

    return(
        <AppContainer>
            <Routes>
                <Route path="/" element={<Dashboard refresh={()=>addArticlesToState()} />} />
                <Route path="/media" element={<Media refresh={()=>addArticlesToState()} />} />
                <Route path="/settings" element={<Settings refresh={()=>addArticlesToState()} />} />
            </Routes>
        </AppContainer>
    )
}

export default DashboardApp;