"use client"

import {useState, useMemo, useEffect} from "react"
import Link from "next/link"
import {Navigation} from "@/app/components/navigation"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {BlogListType, BlogType} from "@/app/types/blog";

const POSTS_PER_PAGE = 6

export default function BlogPage() {
	const [searchQuery, setSearchQuery] = useState("")
	const [currentPage, setCurrentPage] = useState(1)
	const [posts, setPosts] = useState<any[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)


	// Fetch posts from API
	useEffect(() => {
		setLoading(true)
		setError(null)
		const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL
		fetch(`${apiBase}/blog/posts/`)
			.then((res) => {
				if (!res.ok) throw new Error("Failed to fetch posts")
				return res.json()
			})
			.then((data: BlogListType) => {
				const results = Array.isArray(data.results) ? data.results : []
				const parsed = results.map((post: BlogType) => ({
					...post,
					tags: typeof post.tags === "string" ? post.tags.split(",").map((t) => t.trim()) : post.tags,
				}))
				setPosts(parsed)
			})
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false))
	}, [])

	// Filter posts based on search query
	const filteredPosts = useMemo(() => {
		if (!searchQuery.trim()) return posts

		const query = searchQuery.toLowerCase()
		return posts.filter(
			(post) =>
				post.title.toLowerCase().includes(query) ||
				post.excerpt.toLowerCase().includes(query) ||
				(post.tags && post.tags.some((tag: string) => tag.toLowerCase().includes(query))),
		)
	}, [searchQuery, posts])

	// Calculate pagination
	const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
	const startIndex = (currentPage - 1) * POSTS_PER_PAGE
	const endIndex = startIndex + POSTS_PER_PAGE
	const currentPosts = filteredPosts.slice(startIndex, endIndex)

	// Reset to page 1 when search query changes
	const handleSearchChange = (value: string) => {
		setSearchQuery(value)
		setCurrentPage(1)
	}

	return (
		<div className="min-h-screen bg-background text-foreground">
			<Navigation/>

			<main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16 pt-32 pb-20">
				{/* Header Section */}
				<div className="space-y-6 mb-16">
					<div className="space-y-2">
						<div className="text-sm text-muted-foreground font-mono tracking-wider">BLOG</div>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight">Thoughts & Ideas</h1>
					</div>
					<p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
						Writing about web development, design systems, and building better software.
					</p>
				</div>

				{/* Search Bar */}
				<div className="mb-12">
					<div className="relative max-w-xl">
						<svg
							className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
						<Input
							type="text"
							placeholder="Search posts by title, content, or tags..."
							value={searchQuery}
							onChange={(e) => handleSearchChange(e.target.value)}
							className="pl-12 h-12 bg-card border-border focus:border-muted-foreground/50 transition-colors"
						/>
					</div>
					{searchQuery && (
						<p className="mt-3 text-sm text-muted-foreground">
							Found {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"}
						</p>
					)}
				</div>

				{/* Loading/Error State */}
				{loading ? (
					<div className="text-center py-20 text-muted-foreground">Loading posts...</div>
				) : error ? (
					<div className="text-center py-20 text-red-500">{error}</div>
				) : currentPosts.length > 0 ? (
					<div className="grid gap-8 lg:grid-cols-2 mb-16">
						{currentPosts.map((post, index) => (
							<Link
								key={post.slug}
								href={`/blog/${post.slug}?pageTitle=${encodeURIComponent(post.title)}`}
								className="group"
								style={{
									animation: `fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards ${index * 0.1}s`,
									opacity: 0,
								}}
							>
								<article
									className="h-full p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg bg-card">
									<div className="space-y-4">
										{/* Meta Information */}
										<div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
											<span>{post.date}</span>
											<span>{post.readTime}</span>
										</div>

										{/* Title */}
										<h2
											className="text-xl sm:text-2xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
											{post.title}
										</h2>

										{/* Excerpt */}
										<p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>

										{/* Tags */}
										<div className="flex flex-wrap gap-2 pt-2">
											{post.tags && post.tags.map((tag: string) => (
												<span
													key={tag}
													className="px-2 py-1 text-xs border border-border rounded-full text-muted-foreground"
												>
                          {tag}
                        </span>
											))}
										</div>

										{/* Read More Link */}
										<div
											className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 pt-2">
											<span>Read more</span>
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
							</Link>
						))}
					</div>
				) : (
					<div className="text-center py-20">
						<p className="text-lg text-muted-foreground">No posts found matching your search.</p>
						<Button onClick={() => handleSearchChange("")} variant="outline" className="mt-4">
							Clear search
						</Button>
					</div>
				)}

				{/* Pagination */}
				{totalPages > 1 && currentPosts.length > 0 && !loading && !error && (
					<div className="flex items-center justify-center gap-2">
						<Button
							onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
							disabled={currentPage === 1}
							variant="outline"
							className="px-4"
						>
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
							</svg>
							Previous
						</Button>

						<div className="flex items-center gap-2">
							{Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
								<Button
									key={page}
									onClick={() => setCurrentPage(page)}
									variant={currentPage === page ? "default" : "outline"}
									className="w-10 h-10"
								>
									{page}
								</Button>
							))}
						</div>

						<Button
							onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
							disabled={currentPage === totalPages}
							variant="outline"
							className="px-4"
						>
							Next
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
							</svg>
						</Button>
					</div>
				)}
			</main>
		</div>
	)
}
