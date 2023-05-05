import React, { useEffect } from 'react'
import Modal from '../layout/Modal';
import {  toast  } from "react-toastify";
import ArticleService from '../../services/ArticleService';

type Props = {
    closeFunction: Function,
    articleId: string,
    refresh: Function
}

const DeleteArticleDialog = ({closeFunction, articleId, refresh}: Props) => {
    const handleDelete = async() =>{
        try{
            const articleService  = new ArticleService();
            
            const res = await articleService.deleteArticle(articleId);

            toast("Article Deleted Succesfully");

            await refresh();
            closeFunction()

        } catch(e){
            toast.error("Unable to delete article")
            closeFunction()
        }
    }

    useEffect(()=>{
        console.log(articleId)
    },[])

    return (
        <Modal closeFunction={closeFunction}  title='Delete Article'>
            <div className="modal-body">
                <p>Are you sure you want to delete this article</p>
            </div>
            <div className="modal-buttons">
                <button className='material-button-green' onClick={()=>handleDelete()}>Yes</button>
                <button className='material-button-red'onClick={()=>closeFunction()} >No</button>
            </div>
        </Modal>
    )
}

export default DeleteArticleDialog