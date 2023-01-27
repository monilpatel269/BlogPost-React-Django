import React from 'react'
import APIService from '../APIService';
import { useCookies } from 'react-cookie';

function ArticleList(props) {
    const [token] = useCookies(['mytoken']);
    
    const editBtn = (article) => {
        props.editBtn(article);
    }

    const deletBtn = (article) => {
        APIService.DeleteArticle(token['mytoken'], article.id)
            .then(() => props.deletBtn(article))
    }

    return (
        <>

            {props.articles && props.articles.map(article => {
                return (
                    <div key={article.id}>
                        <h3>{article.title}</h3>
                        <p>{article.description}</p>
                        <div className='row'>
                            <div className='col-md-1'>
                                <button className='btn btn-primary btn-sm' onClick={() => editBtn(article)}>Update</button>
                            </div>
                            <div className='col'>
                                <button onClick={() => deletBtn(article)} className='btn btn-danger btn-sm'>Delete</button>
                            </div>
                        </div>
                        <hr className='hrclass' />
                    </div>
                )
            })}

        </>
    )
}

export default ArticleList
