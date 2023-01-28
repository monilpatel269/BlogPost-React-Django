import './App.css';
import ArticleList from './components/ArticleList';
import { useState, useEffect } from 'react';
import Form from './components/Form';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Link } from "react-router-dom"

const App = () => {

  const [token, setToken, removeToken] = useCookies(['mytoken']);
  const [articles, setArticles] = useState([]);
  const [editArticle, setEditArticle] = useState(null);
  const [mode, setMode] = useState('light');
  const [insertForm, setInserForm] = useState(false);
  const [ToggleModeText, setToggleModeText] = useState('Enable');
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
    navigate('/');
  }

  const articleForm = () => {
    setInserForm(true);
    setEditArticle({ title: '', description: '' });
  }

  const insertedInfo = (article) => {
    const new_articles = [...articles, article]
    setArticles(new_articles);
    setEditArticle(null);
    setInserForm(false);
    navigate('/articles');
  }

  const logoutBtn = () => {
    removeToken(['mytoken']);
    navigate('/');
  }

  return (
    <>
    {token['mytoken'] ?
    <div className="App">
        <nav className={`navbar navbar-expand-lg navbar-dark`} style={{ borderBottom: "1px solid",backgroundColor:" #282c34" }}>
          <div className="container-fluid">
            <Link className="navbar-brand" to="/"><h2>BlogPost RD</h2></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <button onClick={articleForm} className='btn btn-success btn-sm'>Add Article</button>
                </li>
              </ul>
            </div>
              <button onClick={logoutBtn} className='btn btn-success btn-sm mx-2' style={{ float: "right" }}>Logout</button>
          </div>
        </nav>
        
        <div className='container'>
          {insertForm ? <Form article={editArticle} insertedInfo={insertedInfo} />: null}
          <ArticleList articles={articles} editBtn={editBtn} deletBtn={deletBtn} updatedInfo={updatedInfo} insertedInfo={insertedInfo} />

        </div>
      </div>
      : navigate('/')}
    </>
  );
}

export default App;
