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
        <td>{article.title}</td>
        <td>{article.image}</td>
        <td>{article.link}</td>
        <td>{article.writer.firstname} {article.writer.lastname}</td>
        <td>{article.editor?.firstname} {article.editor?.lastname}</td>
        <td>{article.status}</td>
        <td><button className='material-button-blue' onClick={()=>setEditModal(true)}>Edit</button></td>
        <td><button className='material-button-red' onClick={()=>setDeleteModal(true)}>Delete</button></td>
    </tr>
    {deleteModal && <DeleteArticleDialog closeFunction={()=>setDeleteModal(false)} articleId={article.id} refresh={refresh} />}
    {editModal && <ArticleModal closeFunction={()=>setEditModal(false)} type='edit' article={article} refresh={refresh} />}
    </>
  )
}

export default ArticleRow