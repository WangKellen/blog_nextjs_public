// components/Footer.js
const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white py-8">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <p>&copy; 2025 个人博客版权所有</p>
        <div className="space-x-4">
          <a href="#" className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
      <script src="https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.2.0-beta.5/libs/cn/index.js"></script>
    </footer>
  );
};

export default Footer;
