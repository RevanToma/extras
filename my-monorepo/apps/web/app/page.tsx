'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

interface Article {
  id: number;
  attributes: {
    title: string;
    content?: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
  };
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:1336/api/articles');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.data) {
        setArticles(data.data);
      } else {
        setArticles(data);
      }
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Knowledge Base</h1>
        <p className={styles.subtitle}>Articles from Strapi</p>

        {loading && (
          <div className={styles.centerContainer}>
            <div className={styles.spinner}></div>
            <p>Loading articles...</p>
          </div>
        )}

        {error && (
          <div className={styles.errorContainer}>
            <p className={styles.errorText}>Error: {error}</p>
            <p className={styles.hintText}>
              Make sure Strapi is running on http://localhost:1336
            </p>
          </div>
        )}

        {!loading && !error && articles.length === 0 && (
          <div className={styles.centerContainer}>
            <p>No articles found</p>
          </div>
        )}

        {!loading && !error && articles.length > 0 && (
          <div className={styles.articlesContainer}>
            {articles.map((article) => (
              <article key={article.id} className={styles.articleCard}>
                <h2 className={styles.articleTitle}>
                  {article.attributes.title}
                </h2>
                {article.attributes.description && (
                  <p className={styles.articleDescription}>
                    {article.attributes.description}
                  </p>
                )}
                {article.attributes.content && (
                  <div
                    className={styles.articleContent}
                    dangerouslySetInnerHTML={{
                      __html:
                        typeof article.attributes.content === 'string'
                          ? article.attributes.content
                          : '',
                    }}
                  />
                )}
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
