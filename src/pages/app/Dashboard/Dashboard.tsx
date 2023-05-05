import React, { useState, useEffect } from 'react';
import EmptyImage from "../../../assets/img/empty.png";
import ArticleListItem from '../../../components/ArticleList';
import moment from 'moment';
import { useAppSelector } from '../../../store/hooks';
import ArticleModal from '../../../components/modals/ArticleModal';

type Props = {
    refresh: Function
}

type status = "For Edit" | "Published";

const Dashboard = ({refresh}: Props) => {

    const [nav, setNav] = useState<status>("For Edit");
    const [list, setList] = useState<ArticleData []>([]);

    const { user }= useAppSelector(state=> state)

    const dateString = moment(new Date()).format("MMMM Do YYYY, h:mm a");

    const [createArticleModal, setCreateArticleModal] = useState(false)

    const { articles } = useAppSelector(state => state);

    const toggleNav = (type: status) => {
        setNav(type)
    }

    useEffect(() => {
        setList(list=>{
            return articles.filter(article=>article.status === nav)
        })
    }, [articles, nav])
    

    return (
        <>
        <div className='dashboard-container'>

            <div className="content">
                <div className="content-header">
                    <p className='headline'>Welcome to Walbro {user.data?.type} Dashboard</p>
                    <p className='tagline'>Data as of {dateString}</p>
                    {user.data?.type === "Writer" && <button className='material-button-green' onClick={()=>setCreateArticleModal(true)}>CREATE ARTICLE</button>}
                </div>
                <div className="content-nav">
                    <div className={nav === "For Edit" ? "nav-item active" : "nav-item"} onClick={()=>toggleNav("For Edit")}>
                        For Edit
                    </div>
                    <div className={nav === "Published" ? "nav-item active" : "nav-item"} onClick={()=>toggleNav("Published")}>
                        Published
                    </div>
                </div>
                <div className="content-container">
                    <div className="article-list">
                        {list.map(article=>(
                            <ArticleListItem refresh={refresh} article={article} key={article.id} />
                        ))}
                    </div>
                    {list.length === 0 && (
                        <div className='empty-image'>
                            <img src={EmptyImage} alt="No Articles to Show" />
                            <h3>No Articles to Show here</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
        {createArticleModal && <ArticleModal refresh={refresh} closeFunction={()=>setCreateArticleModal(false)} type='create' />}
        </>
    )
}

export default Dashboard