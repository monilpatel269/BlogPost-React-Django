import React, { useState, useEffect } from 'react'
import APIService from '../APIService';
import { useCookies } from 'react-cookie';


function Form(props) {
    const [title, setTitle] = useState(props.article.title);
    const [description, setDescription] = useState(props.article.description);
    const [token] = useCookies(['mytoken']);

    const updateArticle = () => {
        APIService.UpdateArticle(props.article.id, token['mytoken'], { title, description })
            .then(resp => props.updatedInfo(resp))
    }

    const insertArticle = () => {
        APIService.InsertArticle(token['mytoken'], { title, description })
            .then(resp => props.insertedInfo(resp))
    }

    useEffect(() => {
        setTitle(props.article.title);
        setDescription(props.article.description);
    }, [props.article])


    return (
        <>
            <div>
                {props.article ? (

                    <div className='mb-3'>
                        <label htmlFor='article_title' className='form-label'>Title</label>
                        <input type='text' className='form-control' id='article_title' placeholder='Enter Title' value={title} onChange={e => { setTitle(e.target.value) }} />
                        <label htmlFor='article_descr' className='form-label my-2'>Description</label>
                        <textarea type='text' className='form-control' id='article_descr' placeholder='Enter Description' value={description} rows='5' onChange={e => { setDescription(e.target.value) }}></textarea>

                        {
                            props.article.id ? <button onClick={updateArticle} className='btn btn-success btn-sm my-2'>Update Article</button> :
                                <button onClick={insertArticle} className='btn btn-success btn-sm my-2'>Add Article</button>
                        }


                    </div>

                ) : null}
            </div>
        </>
    )
}

export default Form
