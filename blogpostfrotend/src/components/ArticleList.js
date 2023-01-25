import React from 'react'

function ArticleList(props) {
    return (
        <>

            {props.articles && props.articles.map(article => {
                return (
                    <div key={article.id}>
                        <h3>{article.title}</h3>
                        <p>{article.description}</p>
                        <hr/>
                    </div>
                )
            })}

        </>
    )
}

export default ArticleList
