import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { stagger } from "../../animations";
import Button from "../../components/Button";
import Cursor from "../../components/Cursor";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import data from "../../data/portfolio.json";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { ISOToDate, useIsomorphicLayoutEffect } from "../../utils";
import { getAllPosts } from "../../utils/api";

const Blog = ({ posts }) => {
  const showBlog = useRef(data.showBlog);
  const text = useRef();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useIsomorphicLayoutEffect(() => {
    stagger([text.current], { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" }, { y: 0, x: 0, transform: "scale(1)" });
    if (showBlog.current) stagger([text.current], { y: 30 }, { y: 0 });
    else router.push("/");
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const createBlog = () => {
    if (process.env.NODE_ENV === "development") {
      fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }).then(() => {
        router.reload(window.location.pathname);
      });
    } else {
      alert("This thing only works in development mode.");
    }
  };

  const deleteBlog = (slug) => {
    if (process.env.NODE_ENV === "development") {
      fetch("/api/blog", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      }).then(() => {
        router.reload(window.location.pathname);
      });
    } else {
      alert("This thing only works in development mode.");
    }
  };

  return (
    showBlog.current && (
      <>
        {data.showCursor && <Cursor />}
        <Head>
          <title>Blog | {data.name} {data.surname}</title>
          <meta name="description" content="Thoughts on frontend development, React, and web technologies." />
        </Head>
        
        <div className={`min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-white ${data.showCursor && "cursor-none"}`}>
          <Header />
          
          <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <motion.h1 
                ref={text}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              >
                Blog
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-gray-400 text-lg mb-12 max-w-2xl"
              >
                Thoughts on frontend development, React, and web technologies.
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts && posts.map((post, index) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                    onClick={() => Router.push(`/blog/${post.slug}`)}
                    className="group cursor-pointer"
                  >
                    <div className="glass rounded-2xl overflow-hidden card-lift">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          src={post.image}
                          alt={post.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 to-transparent" />
                      </div>
                      <div className="p-6">
                        <span className="text-xs text-accent font-medium uppercase tracking-wider">
                          {ISOToDate(post.date)}
                        </span>
                        <h2 className="text-xl font-semibold mt-2 group-hover:text-accent transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                          {post.preview}
                        </p>
                      </div>
                    </div>
                    
                    {process.env.NODE_ENV === "development" && mounted && (
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteBlog(post.slug);
                          }}
                          type={"primary"}
                          classes="!p-2 !min-w-0"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </Button>
                      </div>
                    )}
                  </motion.article>
                ))}
              </div>
            </div>
          </main>

          <Footer data={data} />
        </div>
        
        {process.env.NODE_ENV === "development" && mounted && (
          <div className="fixed bottom-6 right-6">
            <Button onClick={createBlog} type={"primary"}>
              Add New Post +
            </Button>
          </div>
        )}
      </>
    )
  );
};

export async function getStaticProps() {
  const posts = getAllPosts(["slug", "title", "image", "preview", "author", "date"]);

  return {
    props: {
      posts: [...posts],
    },
  };
}

export default Blog;
