import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import data from "../data/portfolio.json";

const PDF_URL = data?.resume?.pdfUrl || "/Abhishek_Gharat_Resume.pdf";

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

  const { resume, name, surname, email, phone } = data;
  const personalProjects = resume.personalProjects || [];
  const universityProjects = resume.universityProjects || [];
  const technicalSkills = resume.technicalSkills || "";

  return (
    <>
      <Head>
        <title>{`${name} ${surname} - Resume`}</title>
        <meta name="description" content={`Resume of ${name} ${surname} - ${resume.tagline}`} />
      </Head>

      <div className="min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-white">
        <div className="no-print">
          <Header />
        </div>

        <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Actions */}
            <div className="no-print mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <p className="text-gray-400 text-sm">
                Correct, up-to-date resume — matches the downloadable PDF.
              </p>
              <div className="flex gap-3">
                <a
                  href={PDF_URL}
                  download="Abhishek_Gharat_Resume.pdf"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-white rounded-lg font-medium transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF
                </a>
              </div>
            </div>

            {/* Resume paper — mirrors the actual PDF */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="resume-paper bg-white text-zinc-900 rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="p-8 md:p-12">
                {/* Name + contact */}
                <div className="text-center">
                  <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-wide">
                    {name.toUpperCase()} {surname.toUpperCase()}
                  </h1>
                  <p className="mt-2 text-sm">
                    {resume.location || "Maharashtra, Mumbai"} | P: {phone || resume.phone || "9767184375"} |{" "}
                    <a href="https://abhishek-gharat.vercel.app" className="underline">Portfolio Website</a> |{" "}
                    <a href="https://github.com/Abhishek-Gharat" target="_blank" rel="noopener noreferrer" className="underline">GitHub</a> |{" "}
                    <a href="https://www.linkedin.com/in/abhishek-gharat-922237218/" target="_blank" rel="noopener noreferrer" className="underline">LinkedIn</a> |{" "}
                    <a href={`mailto:${email}`} className="underline">{email}</a>
                  </p>
                </div>

                {/* Education */}
                <section className="mt-6">
                  <h2 className="font-serif text-lg font-bold text-zinc-600 tracking-wide">EDUCATION</h2>
                  <hr className="border-zinc-800 mt-1 mb-3" />
                  <div className="space-y-4">
                    {data.education.map((edu) => (
                      <div key={edu.id}>
                        <div className="flex justify-between gap-4">
                          <p className="font-bold">{edu.institution.toUpperCase()}</p>
                          <p className="text-sm text-right shrink-0">{edu.location}</p>
                        </div>
                        <div className="flex justify-between gap-4 text-sm">
                          <p className="text-zinc-600">{edu.degree}</p>
                          <p className="shrink-0">{edu.duration}</p>
                        </div>
                        <p className="text-sm pl-8">Major in {edu.field}</p>
                        <p className="text-sm pl-8">
                          {edu.cgpa ? `CGPA: ${edu.cgpa}` : edu.percentage ? `Percentage: ${edu.percentage}` : ""}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Work experience */}
                <section className="mt-6">
                  <h2 className="font-serif text-lg font-bold text-zinc-600 tracking-wide">WORK EXPERIENCE</h2>
                  <hr className="border-zinc-800 mt-1 mb-3" />
                  <div className="space-y-5">
                    {[...resume.experiences].reverse().map((exp) => (
                      <div key={exp.id}>
                        <div className="flex justify-between gap-4">
                          <p className="font-bold">
                            {exp.position.includes(" at ")
                              ? exp.position.split(" at ")[1].toUpperCase() + ` (${exp.type})`
                              : exp.position.toUpperCase()}
                          </p>
                          <p className="text-sm text-right shrink-0">
                            {exp.id === "3" ? "New York" : exp.dates}
                          </p>
                        </div>
                        <div className="flex justify-between gap-4 text-sm">
                          <p className="text-zinc-600">
                            {exp.position.includes(" at ") ? exp.position.split(" at ")[0] : exp.position}
                          </p>
                          {exp.id === "3" && <p className="shrink-0">{exp.dates}</p>}
                        </div>
                        <ul className="mt-1 space-y-1">
                          {exp.bullets.split("\n").map((bullet, i) => (
                            <li key={i} className="flex items-start gap-2 text-[15px] leading-6">
                              <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-zinc-900 flex-shrink-0" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Personal projects */}
                {personalProjects.length > 0 && (
                  <section className="mt-6">
                    <h2 className="font-serif text-lg font-bold text-zinc-600 tracking-wide">PERSONAL PROJECTS</h2>
                    <hr className="border-zinc-800 mt-1 mb-3" />
                    <div className="space-y-4">
                      {personalProjects.map((p) => (
                        <div key={p.id}>
                          <div className="flex justify-between gap-4">
                            <p className="font-bold underline">{p.title}</p>
                            <p className="text-sm shrink-0">{p.dates}</p>
                          </div>
                          <ul className="mt-1 space-y-1">
                            {p.bullets.split("\n").map((b, i) => (
                              <li key={i} className="flex items-start gap-2 text-[15px] leading-6">
                                <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-zinc-900 flex-shrink-0" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* University projects */}
                {universityProjects.length > 0 && (
                  <section className="mt-6">
                    <h2 className="font-serif text-lg font-bold text-zinc-600 tracking-wide">UNIVERSITY PROJECTS</h2>
                    <hr className="border-zinc-800 mt-1 mb-3" />
                    <div className="space-y-4">
                      {universityProjects.map((p) => (
                        <div key={p.id}>
                          <div className="flex justify-between gap-4">
                            <p className="font-bold underline">{p.title}</p>
                            <p className="text-sm shrink-0">{p.dates}</p>
                          </div>
                          <ul className="mt-1 space-y-1">
                            {p.bullets.split("\n").map((b, i) => (
                              <li key={i} className="flex items-start gap-2 text-[15px] leading-6">
                                <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-zinc-900 flex-shrink-0" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Skills */}
                <section className="mt-6">
                  <h2 className="font-serif text-lg font-bold text-zinc-600 tracking-wide">SKILLS</h2>
                  <hr className="border-zinc-800 mt-1 mb-3" />
                  <p className="text-[15px] leading-6">
                    <span className="font-bold">Technical Skills:</span> {technicalSkills}
                  </p>
                </section>
              </div>
            </motion.div>
          </div>
        </main>

        <div className="no-print">
          <Footer data={data} />
        </div>
      </div>

      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          main {
            padding: 0 !important;
          }
          .resume-paper {
            box-shadow: none !important;
            border-radius: 0 !important;
          }
        }
      `}</style>
    </>
  );
};

export default Resume;
