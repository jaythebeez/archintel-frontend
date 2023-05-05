import React, {useEffect, useState} from 'react'
import Modal from '../layout/Modal'
import { EditorState, convertToRaw, convertFromHTML, convertFromRaw, ContentState} from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'draft-js/dist/Draft.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ArticleService from '../../services/ArticleService';
import {  toast  } from "react-toastify";
import { useAppSelector } from '../../store/hooks';

type Props = {
    closeFunction:Function;
    type: "edit" | "create";
    article?: ArticleData;
    refresh: Function
}

interface ArticleFormData {
    id?: string;
    image: string;
    title: string;
    link: string;
    date: Date;
    content: string;
}

const ArticleModal = ({closeFunction, type, article, refresh}: Props) => {

    const {user} = useAppSelector(state=>state)

    const [formData, setFormData] = useState<ArticleFormData>({
        image:"",
        title:"",
        link:"",
        date: new Date(),
        content:""
    })

    const htmlToDraftBlocks = (html: string) => {
        const blocksFromHtml = htmlToDraft(html);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        const editorState = EditorState.createWithContent(contentState);
        return editorState;
    }

    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        setFormData(formData=>{
            return {
                ...formData,
                [key]: e.target.value
            }
        })
    }

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>,) =>{
        setFormData(formData=>{
            return {
                ...formData,
                date: new Date(e.target.value)
            }
        })
    }

    const handleEditorChange = () => {
        const content = convertToRaw(editorState.getCurrentContent());
        const html = draftToHtml(content);  
        setFormData(formData=>{
            return {
                ...formData,
                content: html
            }
        })
    }

    const handleSave = async (e: React.SyntheticEvent) => {
        try{
            e.preventDefault();
            const articleService = new ArticleService();
            const bool = await articleService.addArticle(formData);
            toast("Article Added succesfully");
            await refresh()
            if(bool) closeFunction();
        } catch(e){
            toast.error("Could not save Article")
        }
    }

    const handleEdit = async (e: React.SyntheticEvent) => {
        try{
            if(!article) throw new Error("Article not found")
            e.preventDefault();
            const articleService = new ArticleService();
            const bool = await articleService.editArticle(formData, article?.id);
            toast("Article Updated succesfully")
            await refresh()
            if(bool) closeFunction();
        } catch(e){
            toast.error("Could not edit Article")
        }
    }

    const handlePublish = async (e: React.SyntheticEvent) => {
        try{
            if(!article) throw new Error("Article not found")
            e.preventDefault();
            const articleService = new ArticleService();
            console.log({formData})
            const bool = await articleService.publishArticle(formData, article?.id);
            toast("Article Published succesfully")
            await refresh()
            if(bool) closeFunction();
        } catch(e){
            toast.error("Could not publish Article")
        }
    }

    useEffect(()=>{
        handleEditorChange()
    }, [editorState])

    useEffect(()=>{
        if(type === "edit" && article){
            console.log(article)
            setFormData({
                image:article.image,
                title:article.title,
                link:article.link,
                content:article.content,
                date: new Date()
            })
            setEditorState(htmlToDraftBlocks(article.content))

        }
    },[article])

    const currentDateTime = new Date().toISOString().slice(0, 16);

    return (
        <Modal closeFunction={closeFunction} title={type === "create" ? 'Add New Article' : "Edit New Article"}>
            <form>
                <div className="modal-body">
                    <div className="form-control">
                        <label htmlFor="title" className="form-label">Title:</label>
                        <input type="text" className="form-input" id='title' required onChange={(e)=>handleChange(e, "title")} value={formData.title}/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="image" className="form-label">Image:</label>
                        <input type="text" className="form-input" id='image' required onChange={(e)=>handleChange(e, "image")} value={formData.image}/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="link" className="form-label">link:</label>
                        <input type="text" className="form-input" id='link' required onChange={(e)=>handleChange(e, "link")} value={formData.link}/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="date" className="form-label">Date:</label>
                        <input type="datetime-local" className="form-input" id='date' required onChange={(e)=>handleDateChange(e)} defaultValue={currentDateTime} />
                    </div>
                    <div className='form-control'>
                        <label htmlFor="content" className="form-label">Content:</label>
                        <div className="draft-wrapper">
                            <Editor 
                                editorState={editorState}
                                placeholder="Write something!" 
                                onEditorStateChange={setEditorState}
                            />
                        </div>
                    </div>
                </div>
                {type === "edit" ? (
                    <div className="modal-buttons">
                        <button className='material-button-blue' onClick={handleEdit}>Edit</button>
                        {user.data?.type === "Editor" && type === "edit" && <button className='material-button-green' onClick={handlePublish}>Publish</button>}
                    </div>
                ) : (
                    <button className='material-button-blue' onClick={handleSave}>Save</button>
                )}
            </form>
        </Modal>
    )
}

export default ArticleModal