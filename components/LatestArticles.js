import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const LatestArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/blog-posts/?limit=3');
        if (!response.ok) {
          throw new Error('Failed to fetch latest articles');
        }
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching latest articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestArticles();
  }, []);

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-16 relative z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-xl shadow-lg">
        <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-rose-400 relative z-50">最新文章</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-50">
          {[1, 2, 3].map((index) => (
            <div key={index} className="animate-pulse bg-white/95 dark:bg-white/10 backdrop-blur-lg shadow-xl rounded-xl overflow-hidden border border-gray-200/20 dark:border-white/20 z-50">
              <div className="w-full h-40 bg-gray-200 dark:bg-gray-700" />
              <div className="p-6">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  return (
    <section className="container mx-auto px-4 py-16 relative z-50">
      <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-rose-400">最新文章</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-50">
        {articles.map((article) => (
          <Link href={`/blog/${article.id}`} key={article.id} className="block">
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg shadow-xl rounded-xl overflow-hidden border border-gray-200/20 dark:border-white/10 transform hover:scale-105 transition-all duration-300">
              <div className="relative w-full h-40">
                <Image
                  src={article.cover_image ? (article.cover_image.startsWith('http') ? article.cover_image : `http://127.0.0.1:8000${article.cover_image}`) : '/blog/default-cover.jpg'}
                  alt={article.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-orange-400 mb-3">{article.title}</h3>
                <p className="text-gray-900 dark:text-white/90 line-clamp-2">{article.content ? article.content.slice(0, 150).replace(/<[^>]+>/g, '') : ''}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LatestArticles;