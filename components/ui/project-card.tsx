import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

export interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  title: string;
  logo?: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  /** e.g. "160 60% 30%" — deep emerald */
  themeColor: string;
}

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  (
    {
      className,
      imageUrl,
      title,
      logo,
      description,
      tags = [],
      liveUrl,
      githubUrl,
      featured = false,
      themeColor,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        style={
          {
            // CSS custom property drives the themed glow + gradient
            "--theme-color": themeColor,
          } as React.CSSProperties
        }
        className={cn("group h-full w-full", className)}
        {...props}
      >
        <article
          className="relative flex h-full w-full flex-col overflow-hidden rounded-3xl shadow-lg transition-all duration-500 ease-in-out group-hover:scale-[1.02] group-hover:shadow-[0_0_60px_-15px_hsl(var(--theme-color)/0.6)]"
          style={{
            boxShadow: `0 0 40px -15px hsl(var(--theme-color) / 0.5)`,
          }}
          aria-label={`Project: ${title}`}
        >
          {/* Background image with hover zoom */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />

          {/* Themed gradient overlay — keeps text readable */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, hsl(var(--theme-color) / 0.95), hsl(var(--theme-color) / 0.72) 42%, hsl(var(--theme-color) / 0.25) 68%, transparent 88%)`,
            }}
          />

          {/* Top row: logo + featured badge */}
          <div className="relative flex items-start justify-between p-5">
            {logo ? (
              <span
                aria-hidden="true"
                className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 text-xl backdrop-blur-md"
              >
                {logo}
              </span>
            ) : (
              <span />
            )}
            {featured && (
              <span className="rounded-full bg-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur-md">
                Featured
              </span>
            )}
          </div>

          {/* Content */}
          <div className="relative mt-auto flex flex-col p-5 text-white sm:p-6">
            <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/85">
              {description}
            </p>

            {tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-white/90 backdrop-blur-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="mt-4 flex items-center gap-2">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open live demo of ${title}`}
                  className="flex flex-1 items-center justify-between rounded-xl border border-[hsl(var(--theme-color)/0.3)] bg-[hsl(var(--theme-color)/0.2)] px-4 py-3 backdrop-blur-md transition-all duration-300 group-hover:border-[hsl(var(--theme-color)/0.5)] group-hover:bg-[hsl(var(--theme-color)/0.4)]"
                >
                  <span className="text-sm font-semibold tracking-wide">
                    Explore Live
                  </span>
                  <ArrowUpRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${title} source code on GitHub`}
                  className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-xl border border-white/25 bg-white/10 text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/20"
                >
                  <GithubIcon className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </article>
      </div>
    );
  }
);
ProjectCard.displayName = "ProjectCard";

export { ProjectCard };
