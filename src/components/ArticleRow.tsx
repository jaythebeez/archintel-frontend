import React, {useState} from 'react';
import ArticleModal from './modals/ArticleModal';
import DeleteArticleDialog from './modals/DeleteArticleDialog';

type Props = {
    article: ArticleData;
    refresh: Function
}

const ArticleRow = ({article, refresh}: Props) => {

  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <>
    <tr>
        <th>{article.title}</th>
        <th>{article.image}</th>
        <th>{article.link}</th>
        <th>{article.writer.firstname} {article.writer.lastname}</th>
        <th>{article.editor?.firstname} {article.editor?.lastname}</th>
        <th>{article.status}</th>
        <th><button className='material-button-blue' onClick={()=>setEditModal(true)}>Edit</button></th>
        <th><button className='material-button-red' onClick={()=>setDeleteModal(true)}>Delete</button></th>
    </tr>
    {deleteModal && <DeleteArticleDialog closeFunction={()=>setDeleteModal(false)} articleId={article.id} refresh={refresh} />}
    {editModal && <ArticleModal closeFunction={()=>setEditModal(false)} type='edit' article={article} refresh={refresh} />}
    </>
  )
}

export default ArticleRow