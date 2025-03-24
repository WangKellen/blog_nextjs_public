import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { DotPattern } from '../../components/magicui/dot-pattern';
import { cn } from '@/lib/utils';
import { ScrollProgress } from '../../components/magicui/scroll-progress';
import { useTheme } from 'next-themes';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

function DotPatternBackground() {
  return (
    <div className="fixed inset-0 w-full h-full">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(2000px_circle_at_center,white,transparent)]",
          "opacity-50"
        )}
        glow={false}
      />
    </div>
  );
}

interface Article {
  id: number;
  title: string;
  publish_date: string;
  cover_image: string;
  content: string;
  tags: string[];
}



const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 p-3 bg-orange-500 text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
};

const BlogPost = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = (currentScrollY / scrollHeight) * 100;
          setScrollProgress(progress);

          // 控制头部显示/隐藏
          setIsHeaderVisible(currentScrollY < lastScrollY.current || currentScrollY < 100);
          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState<Article | null>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const fetchArticle = async () => {
      if (id) {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/blog-posts/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch article');
          }
          const data = await response.json();
          setArticle(data);

        } catch (error) {
          console.error('Error fetching article:', error);
        }
      }
    };
    fetchArticle();
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <ScrollProgress />
      
      <div className="absolute inset-0 opacity-30 dark:opacity-50">
        <DotPatternBackground />
      </div>

      <header className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="fixed top-6 left-6 z-50">
            <Link href="/blog" className="group flex items-center gap-3 px-6 py-3 bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 backdrop-blur-lg rounded-xl text-gray-800 dark:text-white transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-orange-400 after:to-rose-400 after:transition-all after:duration-300 group-hover:after:w-full">返回文章列表</span>
            </Link>
          </div>
          
          <div className="fixed top-6 right-6 z-50 flex items-center gap-4">
            
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-4 bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 backdrop-blur-lg rounded-xl text-gray-800 dark:text-white transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20"
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="relative min-h-screen overflow-hidden">
        {/* 全屏封面图 */}
        <div className="relative w-full max-w-[1077px] mx-auto aspect-[1077/616] mt-20">
          {article.cover_image ? (
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <Image
                src={article.cover_image.startsWith('http') ? article.cover_image : `http://127.0.0.1:8000${article.cover_image}`}
                alt={article.title}
                layout="fill"
                objectFit="cover"
                priority
                className="transition-transform duration-300"
                style={{
                  transform: scrollProgress > 0 ? `translateY(${Math.min(scrollProgress * 0.1, 20)}px)` : 'none',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-rose-400/20 dark:from-orange-600/20 dark:to-rose-600/20" />
          )}

          {/* 标题区域 */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full text-center transform translate-y-[-50%] space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-6 text-white/90">

                <span className="flex items-center gap-2 backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {article.publish_date}
                </span>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 backdrop-blur-sm bg-white/10 rounded-full text-sm border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 滚动提示 */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

          {/* 文章内容和目录 */}
          <div className="relative max-w-7xl mx-auto px-4 py-16">
            <div className="flex gap-8">
              <motion.article 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex-grow prose prose-base dark:prose-invert prose-headings:scroll-mt-20 prose-pre:p-0 prose-headings:text-gray-800 dark:prose-headings:text-white prose-a:text-orange-500 hover:prose-a:text-orange-600 dark:prose-a:text-orange-400 dark:hover:prose-a:text-orange-300 prose-headings:font-bold prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-white prose-blockquote:border-orange-500 prose-blockquote:bg-orange-50/50 dark:prose-blockquote:bg-orange-900/10 prose-blockquote:rounded-xl prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:not-italic prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-12 border border-white/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <ReactMarkdown
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '');
                      const language = match ? match[1] : '';
                      return !inline && language ? (
                        <div className="relative">
                          <SyntaxHighlighter
                            style={theme === 'dark' ? dracula : tomorrow}
                            language={language}
                            PreTag="div"
                            customStyle={{
                              margin: '1.5em 0',
                              borderRadius: '0.75rem',
                              padding: '1.5rem',
                              backgroundColor: theme === 'dark' ? '#1e1e1e' : '#f5f5f5',
                            }}
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        </div>
                      ) : (
                        <code className={`${className} bg-gray-100 dark:bg-gray-800 rounded px-2 py-0.5`} {...props}>
                          {children}
                        </code>
                      );
                    },
                    h1: ({ children, ...props }) => {
                      return (
                        <h1 className="group relative" {...props}>
                          <span className="absolute -left-6 opacity-0 group-hover:opacity-100 transition-opacity">#</span>
                          {children}
                        </h1>
                      );
                    },
                    h2: ({ children, ...props }) => {
                      return (
                        <h2 className="group relative" {...props}>
                          <span className="absolute -left-6 opacity-0 group-hover:opacity-100 transition-opacity">#</span>
                          {children}
                        </h2>
                      );
                    },
                    h3: ({ children, ...props }) => {
                      return (
                        <h3 className="group relative" {...props}>
                          <span className="absolute -left-6 opacity-0 group-hover:opacity-100 transition-opacity">#</span>
                          {children}
                        </h3>
                      );
                    },
                    p: ({ children, ...props }) => (
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed" {...props}>{children}</p>
                    ),
                    ul: ({ children, ...props }) => (
                      <ul className="list-disc list-inside space-y-2" {...props}>{children}</ul>
                    ),
                    ol: ({ children, ...props }) => (
                      <ol className="list-decimal list-inside space-y-2" {...props}>{children}</ol>
                    ),
                    blockquote: ({ children, ...props }) => (
                      <blockquote className="relative border-l-4 border-orange-500 bg-gradient-to-r from-orange-50/50 to-rose-50/50 dark:from-orange-900/10 dark:to-rose-900/10" {...props}>
                        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-orange-500 rounded-full" />
                        {children}
                      </blockquote>
                    ),
                  }}
                >
                  {article.content}
                </ReactMarkdown>
              </motion.article>


            </div>
          </div>
      </main>

      <ScrollToTop />
    </div>
  );
};

export default BlogPost;