"use client"

import Link from "next/link"
import {useEffect, useState} from "react"
import {Navigation} from "@/app/components/navigation"

// Sample blog post data - in a real app, this would come from a CMS or database
const blogPost = {
	title: "The Future of Web Development",
	subtitle: "Exploring how AI and automation are reshaping the way we build for the web",
	date: "December 15, 2024",
	readTime: "8 min read",
	author: "Felix Macaspac",
	tags: ["Web Development", "AI", "Future Tech"],
	content: `
The landscape of web development is undergoing a profound transformation. As we stand at the intersection of artificial intelligence and traditional development practices, we're witnessing a shift that promises to redefine how we approach building for the web.

## The Rise of AI-Assisted Development

Artificial intelligence has moved from being a buzzword to a practical tool in our daily development workflow. Tools like GitHub Copilot, ChatGPT, and specialized AI assistants are no longer experimental—they're becoming essential parts of how we write code.

But this isn't about AI replacing developers. It's about augmentation, not replacement. The best developers are learning to work alongside AI, using it to handle repetitive tasks while focusing their energy on solving complex problems and making architectural decisions.

### What This Means for Developers

The role of a developer is evolving. Instead of spending hours debugging syntax errors or searching Stack Overflow for common patterns, we're able to focus on:

- **System design and architecture** - Making high-level decisions about how applications should be structured
- **User experience** - Crafting interfaces that truly serve user needs
- **Performance optimization** - Ensuring applications are fast and efficient
- **Security considerations** - Building robust, secure systems

## The Importance of Fundamentals

While AI tools are powerful, they're only as effective as the developer wielding them. Understanding core concepts—how the web works, performance principles, accessibility standards—becomes even more critical.

> "The best AI-assisted developers are those who understand the fundamentals deeply enough to know when the AI is right and when it's leading them astray."

This is why learning the basics remains crucial. You need to be able to evaluate AI suggestions, understand their implications, and make informed decisions about what to implement.

## Looking Ahead

The future of web development is exciting. We're moving toward a world where:

1. **Development is more accessible** - Lower barriers to entry mean more diverse voices in tech
2. **Productivity increases** - AI handles boilerplate, letting us focus on innovation
3. **Quality improves** - Automated testing and code review catch issues earlier
4. **Creativity flourishes** - With less time on mundane tasks, we can experiment more

## Practical Steps Forward

So how do we prepare for this future? Here are some actionable steps:

\`\`\`typescript
// Embrace modern tooling
const modernWorkflow = {
  aiAssistant: 'GitHub Copilot',
  testing: 'Automated with AI-generated tests',
  deployment: 'Continuous with AI-powered monitoring',
  learning: 'Constant, with AI as a tutor'
}
\`\`\`

The key is to stay curious, keep learning, and remain adaptable. The tools will change, but the fundamental principles of good software development—clean code, user focus, performance, and accessibility—will remain constant.

## Conclusion

We're at an inflection point in web development. The integration of AI into our workflows isn't just changing how we code—it's changing what's possible. By embracing these tools while maintaining our focus on fundamentals, we can build better, faster, and more innovative web experiences than ever before.

The future is here, and it's an exciting time to be a developer.
  `,
}

export default function BlogPost() {
	const [isDark, setIsDark] = useState(true)

	useEffect(() => {
		document.documentElement.classList.toggle("dark", isDark)
	}, [isDark])

	const toggleTheme = () => {
		setIsDark(!isDark)
	}

	return (
		<div className="min-h-screen bg-background text-foreground">
			<Navigation isDark={isDark} toggleTheme={toggleTheme}/>

			<main className="max-w-3xl mx-auto px-6 sm:px-8 pt-32 pb-20">
				{/* Back button */}
				<Link
					href="/#thoughts"
					className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 mb-12 group"
				>
					<svg
						className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
					</svg>
					Back to all posts
				</Link>

				{/* Article header */}
				<header className="mb-12 space-y-6">
					<div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground font-mono">
						<time dateTime="2024-12-15">{blogPost.date}</time>
						<span>•</span>
						<span>{blogPost.readTime}</span>
					</div>

					<h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-balance leading-tight">
						{blogPost.title}
					</h1>

					{blogPost.subtitle && (
						<p className="text-xl sm:text-2xl text-muted-foreground text-pretty leading-relaxed">{blogPost.subtitle}</p>
					)}

					<div className="flex items-center gap-4 pt-4">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
								{blogPost.author
									.split(" ")
									.map((n) => n[0])
									.join("")}
							</div>
							<div className="text-sm">
								<div className="font-medium">{blogPost.author}</div>
								<div className="text-muted-foreground">Frontend Developer</div>
							</div>
						</div>
					</div>

					<div className="flex flex-wrap gap-2 pt-2">
						{blogPost.tags.map((tag) => (
							<span
								key={tag}
								className="px-3 py-1 text-xs border border-border rounded-full text-muted-foreground hover:border-muted-foreground/50 transition-colors duration-300"
							>
                {tag}
              </span>
						))}
					</div>
				</header>

				{/* Article content */}
				<article className="prose prose-neutral dark:prose-invert max-w-none">
					<div className="space-y-6 text-foreground/90 leading-relaxed">
						{blogPost.content.split("\n\n").map((paragraph, index) => {
							// Handle headings
							if (paragraph.startsWith("## ")) {
								return (
									<h2 key={index} className="text-2xl sm:text-3xl font-light tracking-tight mt-12 mb-6 text-foreground">
										{paragraph.replace("## ", "")}
									</h2>
								)
							}

							if (paragraph.startsWith("### ")) {
								return (
									<h3 key={index} className="text-xl sm:text-2xl font-light tracking-tight mt-8 mb-4 text-foreground">
										{paragraph.replace("### ", "")}
									</h3>
								)
							}

							// Handle blockquotes
							if (paragraph.startsWith("> ")) {
								return (
									<blockquote
										key={index}
										className="border-l-2 border-muted-foreground/30 pl-6 py-2 my-8 italic text-lg text-muted-foreground"
									>
										{paragraph.replace("> ", "").replace(/"/g, "")}
									</blockquote>
								)
							}

							// Handle code blocks
							if (paragraph.startsWith("```")) {
								const code = paragraph.replace(/```\w*\n?/g, "").trim()
								return (
									<pre
										key={index}
										className="bg-muted/50 border border-border rounded-lg p-6 overflow-x-auto my-8 text-sm"
									>
                    <code className="text-foreground font-mono">{code}</code>
                  </pre>
								)
							}

							// Handle lists
							if (paragraph.match(/^\d+\./m)) {
								const items = paragraph.split("\n").filter((line) => line.trim())
								return (
									<ol key={index} className="space-y-3 my-6 list-decimal list-inside">
										{items.map((item, i) => (
											<li key={i} className="text-foreground/90 leading-relaxed">
												{item.replace(/^\d+\.\s*/, "")}
											</li>
										))}
									</ol>
								)
							}

							if (paragraph.match(/^[-*]/m)) {
								const items = paragraph.split("\n").filter((line) => line.trim())
								return (
									<ul key={index} className="space-y-3 my-6">
										{items.map((item, i) => {
											const text = item.replace(/^[-*]\s*/, "")
											const [title, ...rest] = text.split(" - ")
											return (
												<li key={i} className="flex gap-3 text-foreground/90 leading-relaxed">
													<span className="text-muted-foreground mt-2">•</span>
													<span>
                            {rest.length > 0 ? (
															<>
																<strong className="text-foreground">{title}</strong> - {rest.join(" - ")}
															</>
														) : (
															text
														)}
                          </span>
												</li>
											)
										})}
									</ul>
								)
							}

							// Handle regular paragraphs
							if (paragraph.trim()) {
								return (
									<p key={index} className="text-base sm:text-lg leading-relaxed my-6">
										{paragraph}
									</p>
								)
							}

							return null
						})}
					</div>
				</article>

				{/* Article footer */}
				<footer className="mt-16 pt-8 border-t border-border">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
						<div className="space-y-2">
							<div className="text-sm text-muted-foreground">Share this article</div>
							<div className="flex gap-3">
								{["Twitter", "LinkedIn", "Copy link"].map((platform) => (
									<button
										key={platform}
										className="px-4 py-2 text-sm border border-border rounded-lg hover:border-muted-foreground/50 transition-colors duration-300"
									>
										{platform}
									</button>
								))}
							</div>
						</div>

						<Link
							href="/#thoughts"
							className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 group"
						>
							View all posts
							<svg
								className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
							</svg>
						</Link>
					</div>
				</footer>

				{/* Related posts */}
				<section className="mt-20 pt-12 border-t border-border">
					<h2 className="text-2xl sm:text-3xl font-light mb-8">Related Posts</h2>
					<div className="grid gap-6 sm:grid-cols-2">
						{[
							{
								title: "Design Systems at Scale",
								excerpt: "Lessons learned from building and maintaining design systems.",
								date: "Nov 2024",
							},
							{
								title: "Performance-First Development",
								excerpt: "Why performance should be a first-class citizen in your workflow.",
								date: "Oct 2024",
							},
						].map((post, index) => (
							<Link
								key={index}
								href="#"
								className="group p-6 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-lg"
							>
								<div className="space-y-3">
									<div className="text-xs text-muted-foreground font-mono">{post.date}</div>
									<h3 className="text-lg font-medium group-hover:text-muted-foreground transition-colors duration-300">
										{post.title}
									</h3>
									<p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
								</div>
							</Link>
						))}
					</div>
				</section>
			</main>
		</div>
	)
}
