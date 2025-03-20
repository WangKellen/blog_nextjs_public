import { useState, useEffect } from 'react';
import { DotPattern } from '../../components/magicui/dot-pattern';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { ScrollProgress } from '../../components/magicui/scroll-progress';
import { RainbowButton } from '@/components/magicui/rainbow-button';
import { useTheme } from 'next-themes';

// 文章分类数据
const categories = [
  { id: 'all', name: '全部', apiName: '全部' },
  { id: 'tech', name: '技术', apiName: '技术' },
  { id: 'product', name: '产品', apiName: '产品' },
  { id: 'life', name: '生活', apiName: '生活' },
  { id: 'thoughts', name: '随想', apiName: '随想' },
];

// 标签数据
const tags = [
  '前端', 'React', 'Next.js', 'Python', 'Django',
  'AI', '产品设计', 'UI/UX', '项目管理', '读书笔记',
  '生活感悟', '摄影', '旅行', '健身', '美食'
];

// 博客文章数据
const articles = [
  {
    id: 1,
    title: '如何打造高质量的产品文档',
    category: 'product',
    tags: ['产品设计', '项目管理'],
    excerpt: '一份好的产品文档不仅能够帮助团队更好地理解产品，还能提高开发效率...',
    coverImage: '/blog/article1.jpg',
    date: '2024-01-15',
    readTime: '8 min',
    likes: 156
  },
  {
    id: 2,
    title: '使用Next.js和TailwindCSS构建现代化网站',
    category: 'tech',
    tags: ['前端', 'React', 'Next.js'],
    excerpt: '本文将介绍如何使用Next.js和TailwindCSS快速构建一个现代化的个人网站...',
    coverImage: '/blog/article2.jpg',
    date: '2024-01-10',
    readTime: '12 min',
    likes: 234
  },
  // 更多文章数据...
];

// 移除本地articles数组

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
  category: string;
  tags: string[];
}

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 提取文章预览内容
  const excerpt = article.content
    ? article.content.slice(0, 150).replace(/<[^>]+>/g, '') + '...'
    : '';

  return (
    <div 
      className="relative overflow-hidden rounded-xl transition-all duration-300 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={article.cover_image ? (article.cover_image.startsWith('http') ? article.cover_image : `http://127.0.0.1:8000${article.cover_image}`) : '/blog/default-cover.jpg'}
            alt={article.title}
            layout="fill"
            objectFit="cover"
            className="transition-all duration-500"
            style={{
              transform: `scale(${isHovered ? 1.1 : 1})`,
            }}
            onError={() => setImageError(true)}
          />
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`} />
        </div>
        
        <div className="flex flex-col flex-grow p-6">
          <div className="flex items-center gap-4 mb-3 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {article.publish_date}
            </span>
          </div>
          
          <div className="flex-grow">
            <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white group-hover:text-orange-500 transition-colors line-clamp-2">{article.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{excerpt}</p>
          </div>
          
          <Link href={`/blog/${article.id}`} className="mt-auto">
            <RainbowButton className="w-full group relative">
              阅读全文
              <span className="absolute right-4 top-1/2 -translate-y-1/2 transition-transform group-hover:translate-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </RainbowButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

interface TagCloudProps {
  tags: string[];
  selectedTags: string[];
  onTagClick: (tag: string) => void;
}

const TagCloud = ({ tags, selectedTags, onTagClick }: TagCloudProps) => (
  <div className="p-6 bg-white/5 dark:bg-white/10 backdrop-blur-lg rounded-xl border border-gray-200 dark:border-white/10 shadow-lg">
    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">标签云</h3>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <button
          key={index}
          onClick={() => onTagClick(tag)}
          className={`px-3 py-1 rounded-full text-sm transition-all ${selectedTags.includes(tag) 
            ? 'bg-orange-500 text-white' 
            : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20'}`}
        >
          {tag}
        </button>
      ))}
    </div>
  </div>
);

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [blogPosts, setBlogPosts] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const { theme, setTheme } = useTheme();

  // 获取标签数据
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/tags/');
        if (!response.ok) {
          throw new Error('Failed to fetch tags');
        }
        const data = await response.json();
        // 处理标签数据，确保获取标签名称
        const tagNames = data.map((tag: { id: number; name: string; post_count: number }) => tag.name);
        setAvailableTags(tagNames);
      } catch (error) {
        console.error('Error fetching tags:', error);
        setAvailableTags([]);
      }
    };
    fetchTags();
  }, []);

  // 获取文章数据
  useEffect(() => {
    const fetchBlogPosts = async () => {
      setLoading(true);
      try {
        let url = 'http://127.0.0.1:8000/api/blog-posts/';
        const params = new URLSearchParams();
        
        if (activeCategory !== 'all') {
          const category = categories.find(c => c.id === activeCategory);
          if (category) {
            params.append('category', category.apiName);
          }
        }
        
        if (selectedTags.length > 0) {
          selectedTags.forEach(tag => params.append('tag', tag));
        }

        if (searchQuery) {
          params.append('search', searchQuery);
        }

        const finalUrl = `${url}${params.toString() ? `?${params.toString()}` : ''}`;
        const response = await fetch(finalUrl);
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data = await response.json();
        setBlogPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchBlogPosts();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [activeCategory, selectedTags, searchQuery]);

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleCategoryClick = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    setActiveCategory(categoryId);
  };
  const filteredPosts = blogPosts;

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <ScrollProgress />
      
      <div className="absolute inset-0 opacity-30 dark:opacity-50">
        <DotPatternBackground />
      </div>

      <div className="fixed top-6 left-6 z-50">
        <Link href="/" className="inline-flex items-center px-6 py-3 bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 backdrop-blur-lg rounded-xl text-gray-800 dark:text-white transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          返回主页
        </Link>
      </div>

      <div className="fixed top-6 right-6 z-50">
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
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-rose-400">
            博客文章
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            分享技术、产品和生活的点点滴滴
          </p>

          {/* 分类选择器 */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${activeCategory === category.id 
                  ? 'bg-gradient-to-r from-orange-400 to-rose-400 text-white font-medium shadow-lg hover:shadow-xl hover:from-orange-500 hover:to-rose-500' 
                  : 'bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'}`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* 搜索框 */}
          <div className="relative w-full max-w-md mx-auto">
            <input
              type="text"
              placeholder="搜索文章..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 dark:bg-white/5 backdrop-blur-lg rounded-full text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 border border-white/20"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="flex gap-8">
          {/* 文章列表 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              // 加载状态
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
              ))
            ) : blogPosts.length > 0 ? (
              blogPosts.map((post) => (
                <ArticleCard key={post.id} article={post} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-4xl mb-4">😢</div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                  暂无文章
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  当前分类或标签下没有找到任何文章
                </p>
              </div>
            )}
          </div>
          {/* 侧边栏 */}
          <div className="hidden lg:block w-80 flex-shrink-0 space-y-6">
            <TagCloud
              tags={availableTags}
              selectedTags={selectedTags}
              onTagClick={handleTagClick}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogPage;