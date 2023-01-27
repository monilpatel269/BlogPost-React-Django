import './App.css';
import ArticleList from './components/ArticleList';
import { useState, useEffect } from 'react';
import Form from './components/Form';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const App = () => {

  const [token, setToken, removeToken] = useCookies(['mytoken']);
  const [articles, setArticles] = useState([]);
  const [editArticle, setEditArticle] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/articles/', {
      'method': 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['mytoken']}`,
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
    const new_article = articles.filter(myarticle => {
      if (myarticle.id === article.id) {
        return false
      }
      else {
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

  const logoutBtn = () => {
    removeToken(['mytoken']);
    navigate('/');
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

            <div className='col'>
              <button onClick={logoutBtn} className='btn btn-success btn-sm'>Logout</button>
            </div>
          </div>

          <ArticleList articles={articles} editBtn={editBtn} deletBtn={deletBtn} />
          {editArticle ? <Form article={editArticle} updatedInfo={updatedInfo} insertedInfo={insertedInfo} /> : null}

        </div>
      </div>
    </>
  );
}

export default App;
