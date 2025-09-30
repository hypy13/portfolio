"use client"

import {ResumeProp} from "@/app/types/resume";
import Link from "next/link";

interface ThoughtsSectionProps {
  sectionRef: (el: HTMLElement | null) => void,
	resume: ResumeProp,
}

export function ThoughtsSection({ sectionRef }: ThoughtsSectionProps) {
  return (
    <section
      id="thoughts"
      ref={sectionRef}
      className="min-h-screen py-20 sm:py-32 opacity-0"
    >
      {/* ...existing code for thoughts section... */}
      <div className="space-y-12 sm:space-y-16">
        <h2 className="text-3xl sm:text-4xl font-light">Recent Thoughts</h2>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          {[
            {
              title: "The Future of Web Development",
              excerpt: "Exploring how AI and automation are reshaping the way we build for the web.",
              date: "Dec 2024",
              readTime: "5 min",
            },
            {
              title: "Design Systems at Scale",
              excerpt: "Lessons learned from building and maintaining design systems across multiple products.",
              date: "Nov 2024",
              readTime: "8 min",
            },
            {
              title: "Performance-First Development",
              excerpt: "Why performance should be a first-class citizen in your development workflow.",
              date: "Oct 2024",
              readTime: "6 min",
            },
            {
              title: "The Art of Code Review",
              excerpt: "Building better software through thoughtful and constructive code reviews.",
              date: "Sep 2024",
              readTime: "4 min",
            },
          ].map((post, index) => (
            <article
              key={index}
              className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                  {post.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>

                <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
									<Link href="/blog/shi">Read more</Link>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
