import React from 'react'
import { useAppSelector } from '../../../store/hooks';
import ArticleRow from '../../../components/ArticleRow';

type Props = {
    refresh: Function
}

const Media = ({refresh}: Props) => {

  const {articles} = useAppSelector(state=>state);
  
  return (
    <div className='media-container'>
        <div className="content">
            <div className="content-header">
                <p className='headline'>Walbro - All Media</p>
                <p className="tagline">This table shows all articles for Walbro</p>
            </div>

            <div className="content-table">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Image</th>
                            <th>Link</th>
                            <th>Writer</th>
                            <th>Editor</th>
                            <th>Status</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map(article=>(
                            <ArticleRow refresh={refresh} article={article} key={article.id} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default Media