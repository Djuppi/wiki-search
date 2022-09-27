import { useEffect, useState } from 'react';

import styles from '../styles/Home.module.css'

export default function Home() {
  const [search, setSearch] = useState('');
  const [searchTime, setSearchTime] = useState(0);
  const [articles, setArticles] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {

  }, [articles, searchTime])

  const handleSubmit = async (e, search) => {
    e.preventDefault();
    if(search === '') {
      setError('Search parameter is required');
      return;
    }


    
    try {
      const API_URL = `https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch=${search}&sort=relevan`;
      const articles = await fetch(`${API_URL}`);
  
      const articlesData = await articles.json();
      console.log(articlesData)
      const pages = articlesData.query.pages
      setArticles(pages);
    } catch(err) {
      console.error(err);
    }
    


  }

  return (
    <div className={styles.container}>
      <h1>Search for Wikipedia articles</h1>
      <form >
        <input className={styles.input} type="search" value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className={styles.btnContainer}>
          <button className={styles.button} disabled={search === ''} type='submit' onClick={(e) => (handleSubmit(e, search))}>Search</button>
        </div>
        
      </form>
      
      {error && <p>{error}</p>}

      <div className={styles.articleContainer}>
        {Object.values(articles).map(article => {
          return (
            <div key={article.pageId} className={styles.card} >
              <p>Article title:</p>
              <h1>{article.title}</h1>
            </div>
          )
        })}
      </div>

    </div>
  )
}
