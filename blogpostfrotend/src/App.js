import './App.css';
import ArticleList from './components/ArticleList';
import { useState, useEffect } from 'react';

const App = () => {

  const auth_token = process.env.REACT_APP_BACKEND_AUTH_TOKEN;
  const [articles, setArticles] = useState([]);

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


  return (
    <>
      <div className="App">
        <div className='container'>
          <h2>Blog Post RD</h2>
          <ArticleList articles={articles} />
        </div>
      </div>
    </>
  );
}

export default App;
