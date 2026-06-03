import React, { useState } from "react";
import { motion } from "framer-motion";

const About = ({ data }) => {
  const [activeTab, setActiveTab] = useState(0);
  
  const tabs = [
    { id: "about", label: "About Me" },
    { id: "interests", label: "Interests" },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Get to Know <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex gap-4 mb-8 border-b border-gray-200 dark:border-gray-800"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tabs.findIndex((t) => t.id === tab.id))}
              className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
                activeTab === tabs.findIndex((t) => t.id === tab.id)
                  ? "text-accent"
                  : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
            >
              {tab.label}
              {activeTab === tabs.findIndex((t) => t.id === tab.id) && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: About Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {activeTab === 0 && (
              <div className="space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed">
                  {data.about?.intro}
                </p>
                {data.about?.paragraphs?.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-gray-400 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
            
            {activeTab === 1 && (
              <div className="grid grid-cols-2 gap-4">
                {data.about?.interests?.map((interest, index) => (
                  <motion.div
                    key={interest}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="glass rounded-xl p-4 flex items-center gap-3 card-lift"
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <span className="font-medium">{interest}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right: Stats & Quick Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "2+", label: "Years Experience" },
                { value: "10+", label: "Projects Completed" },
                { value: "5+", label: "Technologies" },
                { value: "∞", label: "Cups of Coffee" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  className="glass rounded-xl p-6 text-center card-lift"
                >
                  <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Quick Info Card */}
            <div className="glass rounded-xl p-6">
              <h3 className="font-semibold mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Location</span>
                  <span className="font-medium">{data.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Experience</span>
                  <span className="font-medium">2+ Years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Availability</span>
                  <span className="text-green-400 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Open to work
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
