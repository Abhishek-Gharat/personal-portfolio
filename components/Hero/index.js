import React from 'react';
import { SkyHero } from './SkyHero';

const Hero = ({ data }) => {
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const githubHref =
    data?.socials?.find((s) => s.title === "GitHub")?.link ??
    "https://github.com/Abhishek-Gharat";
  const linkedinHref =
    data?.socials?.find((s) => s.title === "LinkedIn")?.link ??
    "https://www.linkedin.com/in/abhishek-gharat-922237218/";

  return (
    <section id="hero" className="relative w-full overflow-hidden">
      <SkyHero
        eyebrow={`Hello, I'm ${data ? `${data.name} ${data.surname}` : "Abhishek Gharat"} —`}
        line1="Developer who"
        rollWords={["Builds", "Ships", "Scales", "Automates"]}
        playerTitle="Dev journey, looped"
        verticalText="REACT / NEXT.JS / FLOWS"
        tagline="React · Next.js · React Flow — production interfaces"
        primaryCta="View My Work"
        onPrimaryCta={scrollToProjects}
        secondaryCtaHref={data?.showResume === false ? "/#projects" : "/resume"}
        githubHref={githubHref}
        linkedinHref={linkedinHref}
      />
    </section>
  );
};

export default Hero;
