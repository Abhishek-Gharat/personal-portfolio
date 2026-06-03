import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import data from "../data/portfolio.json";

const Resume = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!data.showResume) {
      router.push("/");
    }
  }, [router]);

  if (!mounted) return null;

  const { resume, name, surname, email } = data;

  return (
    <>
      <Head>
        <title>{`${name} ${surname} - Resume`}</title>
        <meta name="description" content={`Resume of ${name} ${surname} - ${resume.tagline}`} />
      </Head>

      <div className="min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-white">
        <Header />
        
        <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Resume Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="p-8 md:p-12 border-b border-white/5">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                      {name} {surname}
                    </h1>
                    <p className="text-xl text-accent mb-4">{resume.tagline}</p>
                    <p className="text-gray-400 max-w-xl leading-relaxed">
                      {resume.description}
                    </p>
                  </div>
                  
                  {/* Contact Info */}
                  <div className="flex flex-col gap-2 text-sm">
                    <a 
                      href={`mailto:${email}`}
                      className="flex items-center gap-2 text-gray-400 hover:text-accent transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {email}
                    </a>
                    <a 
                      href="https://github.com/Abhishek-Gharat"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-400 hover:text-accent transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                      github.com/Abhishek-Gharat
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/abhishek-gharat-922237218/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-400 hover:text-accent transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      linkedin.com/in/abhishek-gharat
                    </a>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-12 space-y-10">
                {/* Experience */}
                <section>
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-8 h-0.5 bg-accent"></span>
                    Experience
                  </h2>
                  <div className="space-y-6">
                    {resume.experiences.map((exp) => (
                      <div key={exp.id} className="group">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                          <h3 className="font-semibold text-lg">{exp.position}</h3>
                          <span className="text-sm text-accent font-medium">{exp.dates}</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-2">{exp.type}</p>
                        {exp.bullets && (
                          <ul className="space-y-1">
                            {exp.bullets.split("\\n").map((bullet, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                {/* Education */}
                <section>
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-8 h-0.5 bg-accent"></span>
                    Education
                  </h2>
                  <div className="space-y-4">
                    {data.education.map((edu) => (
                      <div key={edu.id}>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <h3 className="font-semibold text-lg">{edu.degree}</h3>
                          <span className="text-sm text-accent font-medium">{edu.duration}</span>
                        </div>
                        <p className="text-gray-400">{edu.institution}</p>
                        <p className="text-sm text-gray-500 mt-1">{edu.field}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Skills */}
                <section>
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-8 h-0.5 bg-accent"></span>
                    Skills
                  </h2>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Languages */}
                    <div>
                      <h3 className="font-medium text-sm text-gray-400 uppercase tracking-wider mb-3">
                        Languages
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {resume.languages.map((lang) => (
                          <span
                            key={lang}
                            className="px-3 py-1 text-sm bg-white/5 rounded-full border border-white/10"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Frameworks */}
                    <div>
                      <h3 className="font-medium text-sm text-gray-400 uppercase tracking-wider mb-3">
                        Frameworks
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {resume.frameworks.map((fw) => (
                          <span
                            key={fw}
                            className="px-3 py-1 text-sm bg-white/5 rounded-full border border-white/10"
                          >
                            {fw}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Tools */}
                    <div>
                      <h3 className="font-medium text-sm text-gray-400 uppercase tracking-wider mb-3">
                        Tools
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {resume.others.map((tool) => (
                          <span
                            key={tool}
                            className="px-3 py-1 text-sm bg-white/5 rounded-full border border-white/10"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Download Button */}
              <div className="p-8 md:p-12 border-t border-white/5 bg-white/5">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-gray-400 text-sm">
                    Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </p>
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-white rounded-lg font-medium transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download PDF
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </main>

        <Footer data={data} />
      </div>
    </>
  );
};

export default Resume;
