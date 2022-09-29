import { useState } from 'react';
import MoonLoader from "react-spinners/MoonLoader";
import { FiExternalLink } from 'react-icons/fi';

import styles from '../styles/Home.module.css';

const loadingStyle = {
  margin: "0 auto",
  borderColor: "red",
};

export default function Home() {
  const [search, setSearch] = useState('');
  const [articles, setArticles] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e, search) => {
    e.preventDefault();
    if(search === '') {
      setError('Search parameter is required');
      return;
    }
    
    try {
      setLoading(true);
      const API_URL = `https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch=${search}&prop=info|extracts&inprop=url`;
      const articles = await fetch(`${API_URL}`);
  
      const articlesData = await articles.json();
      console.log(articlesData.query.pages)
      const pages = articlesData.query.pages
      setArticles(pages);
    } catch(err) {
      console.error(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <h1>Search for top 5 Wikipedia articles</h1>
      <form >
        <input className={styles.input} type="search" value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className={styles.btnContainer}>
          <button className={styles.button} disabled={search === ''} type='submit' onClick={(e) => (handleSubmit(e, search))}>Search</button>
        </div>
        
      </form>
      
      {error && <p>{error}</p>}

      <div className={styles.articleContainer}>
        {loading ? 
          <MoonLoader color='#000' loading={loading} cssOverride={loadingStyle} size={150} /> 
          :
          Object.values(articles).map(article => {
            return (
                <div className={styles.card}>
                  <p>Article title:</p>
                  <h1>{article.title}</h1>
                  <a href={article.fullurl} rel="noreferrer" target="_blank">Read article <FiExternalLink /></a>
                </div>
            )
          })
        }
        
      </div>

    </div>
  )
}
