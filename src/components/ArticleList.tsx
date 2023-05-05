import React, {useEffect, useState} from 'react'
import ArticleModal from './modals/ArticleModal'
import { useAppSelector } from '../store/hooks'
import DeleteArticleDialog from './modals/DeleteArticleDialog';

type Props = {
  article: ArticleData;
  refresh: Function
}

const ArticleListItem = ({article, refresh}: Props) => {

  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  
  return (
    <>
    <div className="article-list-item">
      <div className='item-detail'>
          <span className='title'>Title:</span>
          <span className='detail'>{article.title}</span>
      </div>
      <div className='item-detail'>
          <span className='title'>Image:</span>
          <span className='detail'>{article.image}</span>
      </div>
      <div className='item-detail'>
          <span className='title'>link:</span>
          <span className='detail'>{article.link}</span>
      </div>
      <div className='item-detail'>
          <span className='title'>Writer Name:</span>
          <span className='detail'>{article.writer.firstname} {article.writer.lastname}</span>
      </div>
      <div className='item-detail'>
          <span className='title'>Editor Name:</span>
          <span className='detail'>{article.editor?.firstname} {article.editor?.lastname}</span>
      </div>
      <div className='item-detail'>
          <span className='title'>Status:</span>
          <span className='detail'>{article.status}</span>
      </div>
      <div className="button-container">
        {article.status === "For Edit" && <button className='material-button-blue' onClick={()=>setEditModal(true)}>Edit</button>}
        <button className='material-button-red' onClick={()=>setDeleteModal(true)}>Delete</button>
      </div>
    </div>
    {editModal && <ArticleModal closeFunction={()=>setDeleteModal(false)} type='edit' article={article} refresh={refresh} />}
    {deleteModal && <DeleteArticleDialog closeFunction={()=>setDeleteModal(false)} articleId={article.id} refresh={refresh} />}

    </>
  )
}

export default ArticleListItem;