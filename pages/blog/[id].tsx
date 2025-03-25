import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
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
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

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

// 计算阅读时间
function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200; // 平均阅读速度
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
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
  const [timeFromNow, setTimeFromNow] = useState('');
  const [readingTime, setReadingTime] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

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

          // 计算发布时间距今多久
          if (data.publish_date) {
            try {
              const date = new Date(data.publish_date);
              setTimeFromNow(formatDistanceToNow(date, { addSuffix: true, locale: zhCN }));
            } catch (e) {
              console.error('Error formatting date:', e);
            }
          }

          // 计算阅读时间
          if (data.content) {
            setReadingTime(calculateReadingTime(data.content));
          }

        } catch (error) {
          console.error('Error fetching article:', error);
        }
      }
    };
    fetchArticle();
  }, [id]);

  // 共享文章功能
  const shareArticle = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => alert('链接已复制到剪贴板'))
      .catch(err => console.error('无法复制链接: ', err));
  };

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
          <div className="fixed top-6 left-6 z-50 sm:block hidden">
            <Link href="/blog" className="group flex items-center gap-3 px-6 py-3 bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 backdrop-blur-lg rounded-xl text-gray-800 dark:text-white transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-orange-400 after:to-rose-400 after:transition-all after:duration-300 group-hover:after:w-full">返回文章列表</span>
            </Link>
          </div>
          
          <div className="fixed top-6 right-6 z-50 flex items-center gap-4">
            {/* <button
              onClick={shareArticle}
              className="p-4 bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 backdrop-blur-lg rounded-xl text-gray-800 dark:text-white transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button> */}
            
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

      {/* 移动端返回按钮 */}
      <div className="sm:hidden fixed bottom-24 left-6 z-50">
        <Link href="/blog" className="flex items-center justify-center p-4 bg-orange-500 text-white rounded-full shadow-lg transition-all duration-300 hover:bg-orange-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>

      <main className="relative min-h-screen overflow-hidden">
        {/* 全屏封面图 */}
        <div className="relative w-full max-w-[1077px] mx-auto aspect-[1077/616] mt-20">
          {article.cover_image ? (
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <div className={`transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <Image
                  src={article.cover_image.startsWith('http') ? article.cover_image : `http://127.0.0.1:8000${article.cover_image}`}
                  alt={article.title}
                  layout="fill"
                  objectFit="cover"
                  priority
                  onLoadingComplete={() => setImageLoaded(true)}
                  className="transition-transform duration-300"
                  style={{
                    transform: scrollProgress > 0 ? `translateY(${Math.min(scrollProgress * 0.1, 20)}px)` : 'none',
                  }}
                />
              </div>
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800">
                  <div className="animate-pulse w-16 h-16 rounded-full bg-orange-300 dark:bg-orange-700"></div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-rose-400/20 dark:from-orange-600/20 dark:to-rose-600/20 rounded-2xl" />
          )}

          {/* 标题区域 */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full text-center transform translate-y-[-50%] space-y-6">
              <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-white/90">
                <span className="flex items-center gap-2 backdrop-blur-sm bg-white/10 px-3 md:px-4 py-1 md:py-2 rounded-full text-sm md:text-base">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {article.publish_date}
                </span>
                
                <span className="flex items-center gap-2 backdrop-blur-sm bg-white/10 px-3 md:px-4 py-1 md:py-2 rounded-full text-sm md:text-base">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {timeFromNow}
                </span>
                
                <span className="flex items-center gap-2 backdrop-blur-sm bg-white/10 px-3 md:px-4 py-1 md:py-2 rounded-full text-sm md:text-base">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  阅读时间 {readingTime} 分钟
                </span>
              </div>
              
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 md:px-4 py-1 md:py-2 backdrop-blur-sm bg-white/10 rounded-full text-xs md:text-sm border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                  >
                    {tag}
                  </span>
                ))}
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

        {/* 文章内容 */}
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <motion.article 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto prose prose-base md:prose-lg dark:prose-invert prose-headings:scroll-mt-20 prose-pre:p-0 prose-headings:text-gray-800 dark:prose-headings:text-white prose-a:text-orange-500 hover:prose-a:text-orange-600 dark:prose-a:text-orange-400 dark:hover:prose-a:text-orange-300 prose-headings:font-bold prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-white prose-blockquote:border-orange-500 prose-blockquote:bg-orange-50/50 dark:prose-blockquote:bg-orange-900/10 prose-blockquote:rounded-xl prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:not-italic prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 md:p-12 border border-white/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <ReactMarkdown
              components={{
                code: ({ node, inline, className, children, ...props }: React.ComponentProps<'code'> & { node?: any; inline?: boolean }) => {
                  const match = /language-(\w+)/.exec(className || '');
                  const language = match ? match[1] : '';
                  return !inline && language ? (
                    <div className="relative group">
                      <div className="absolute -top-5 right-2 text-xs bg-gray-200 dark:bg-gray-700 rounded px-2 py-1 font-mono text-gray-600 dark:text-gray-300">
                        {language}
                      </div>
                      <SyntaxHighlighter
                        style={theme === 'dark'? dracula : tomorrow}
                        language={language}
                        PreTag="div"
                        customStyle={{
                          margin: '1.5em 0',
                          borderRadius: '0.75rem',
                          padding: '1.5rem',
                          backgroundColor: theme === 'dark' ? '#1e1e1e' : '#f5f5f5',
                          overflowX: 'auto',
                          fontSize: '0.875rem',
                          lineHeight: '1.5',
                        }}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                      <button 
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-200 dark:bg-gray-700 p-2 rounded"
                        onClick={() => {
                          navigator.clipboard.writeText(String(children));
                          alert('已复制到剪贴板');
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <code className={`${className} bg-gray-100 dark:bg-gray-800 rounded px-2 py-0.5`} {...props}>
                      {children}
                    </code>
                  );
                },
                img: ({ node, src, alt, ...props }) => {
                  if (!src) return null;
                  
                  // 处理图片路径
                  const imgSrc = src.startsWith('http') 
                    ? src 
                    : `http://127.0.0.1:8000${src}`;
                  
                  return (
                    <div className="my-6 text-center">
                      <img
                        src={imgSrc}
                        alt={alt || '文章图片'}
                        className="max-w-full h-auto rounded-lg mx-auto shadow-lg"
                        loading="lazy"
                        {...props}
                      />
                      {alt && <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{alt}</p>}
                    </div>
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
      </main>

      <ScrollToTop />
    </div>
  );
};

export default BlogPost;
