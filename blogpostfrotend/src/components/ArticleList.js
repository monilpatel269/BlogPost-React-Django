import { React, useState } from 'react';
import APIService from '../APIService';
import Form from './Form';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function ArticleList(props) {
    let navigate = useNavigate();
    const [token] = useCookies(['mytoken']);
    const [editArticle, setEditArticle] = useState(null);
    const [showBtn, setShowBtn] = useState(true);

    const editBtn = (article) => {
        setEditArticle(article);
        setShowBtn(false);

    }
    const deletBtn = (article) => {
        APIService.DeleteArticle(token['mytoken'], article.id)
            .then(() => props.deletBtn(article))
    }

    const showBtns = (show) => {
        setShowBtn(show);
        navigate('/articles');
    }

    return (
        <>
            <div className='my-3'>
                {props.articles && props.articles.map(article => {
                    return (
                        <div key={article.id}>
                            {editArticle && (editArticle.id === article.id) ?
                                <Form article={editArticle} updatedInfo={props.updatedInfo} insertedInfo={props.insertedInfo} showBtns={showBtns} /> :

                                <><div>
                                    <h3>{article.title}</h3>
                                    <p>{article.description}</p>
                                </div>
                                </>
                            }
                            {showBtn || (editArticle && editArticle.id != article.id) ?
                                <div className='row'>
                                    <div className='col-md-1'>
                                        <button className='btn btn-primary btn-sm' onClick={() => editBtn(article)}>Update</button>
                                    </div>
                                    <div className='col'>
                                        <button onClick={() => deletBtn(article)} className='btn btn-danger btn-sm'>Delete</button>
                                    </div>
                                </div>
                                : null}

                            <hr className='hrclass' />
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default ArticleList
