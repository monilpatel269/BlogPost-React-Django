import './App.css';
import ArticleList from './components/ArticleList';
import { useState, useEffect } from 'react';
import Form from './components/Form';

const App = () => {

  const auth_token = process.env.REACT_APP_BACKEND_AUTH_TOKEN;
  const [articles, setArticles] = useState([]);
  const [editArticle, setEditArticle] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/articles/', {
      'method': 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth_token,
      }
    })
      .then(resp => resp.json())
      .then(resp => setArticles(resp))
      .catch(error => console.log(error))
  }, [])

  const editBtn = (article) => {
    setEditArticle(article);

  }

  const deletBtn = (article) => {
    const new_article = articles.filter(myarticle =>{
      if(myarticle.id===article.id){
        return false
      }
      else{
        return true
      }
    })
    setArticles(new_article)

  }

  const updatedInfo = (article) => {
    const new_article = articles.map(myarticle => {
      if (myarticle.id === article.id) {
        return article;
      }
      else {
        return myarticle;
      }
    })
    setArticles(new_article);
    setEditArticle(null);
  }

  const articleForm = () => {
    setEditArticle({ title: '', description: '' })
  }

  const insertedInfo = (article) => {
    const new_articles = [...articles, article]
    setArticles(new_articles);
    setEditArticle(null);
  }

  return (
    <>
      <div className="App">
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <h2>Blog Post RD</h2>
            </div>
            <div className='col'>
              <button onClick={articleForm} className='btn btn-success btn-sm'>Add Article</button>
            </div>
          </div>

          <ArticleList articles={articles} editBtn={editBtn} deletBtn={deletBtn} auth_token={auth_token} />
          {editArticle ? <Form article={editArticle} updatedInfo={updatedInfo} insertedInfo={insertedInfo} auth_token={auth_token} /> : null}

        </div>
      </div>
    </>
  );
}

export default App;
