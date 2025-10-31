import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

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

export default function HomeScreen() {
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
    <ScrollView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type='title'>Knowledge Base</ThemedText>
        <ThemedText>Articles from Strapi</ThemedText>
      </ThemedView>

      {loading && (
        <ThemedView style={styles.centerContainer}>
          <ActivityIndicator size='large' />
          <ThemedText style={styles.loadingText}>
            Loading articles...
          </ThemedText>
        </ThemedView>
      )}

      {error && (
        <ThemedView style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>Error: {error}</ThemedText>
          <ThemedText style={styles.hintText}>
            Make sure Strapi is running on http://localhost:1336
          </ThemedText>
        </ThemedView>
      )}

      {!loading && !error && articles.length === 0 && (
        <ThemedView style={styles.centerContainer}>
          <ThemedText>No articles found</ThemedText>
        </ThemedView>
      )}

      {!loading && !error && articles.length > 0 && (
        <ThemedView style={styles.articlesContainer}>
          {articles.map((article) => (
            <ThemedView key={article.id} style={styles.articleCard}>
              <ThemedText type='subtitle' style={styles.articleTitle}>
                {article.attributes.title}
              </ThemedText>
              {article.attributes.description && (
                <ThemedText style={styles.articleDescription}>
                  {article.attributes.description}
                </ThemedText>
              )}
              {article.attributes.content && (
                <ThemedText style={styles.articleContent} numberOfLines={3}>
                  {article.attributes.content}
                </ThemedText>
              )}
            </ThemedView>
          ))}
        </ThemedView>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleContainer: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
    marginTop: 16,
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 12,
  },
  loadingText: {
    marginTop: 12,
  },
  errorContainer: {
    padding: 20,
    backgroundColor: '#ffebee',
    borderRadius: 8,
    margin: 16,
  },
  errorText: {
    color: '#c62828',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  hintText: {
    fontSize: 12,
    color: '#666',
  },
  articlesContainer: {
    gap: 16,
  },
  articleCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  articleTitle: {
    marginBottom: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  articleDescription: {
    marginBottom: 8,
    fontSize: 14,
    color: '#666',
  },
  articleContent: {
    fontSize: 14,
    lineHeight: 20,
  },
});
