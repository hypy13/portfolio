"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Navigation } from "@/app/components/navigation"
import {BlogType} from "@/app/types/blog";

export default function BlogPost() {
  const searchParams = useSearchParams()
  // Extract slug from the URL path
  const slug = typeof window !== 'undefined' ? window.location.pathname.split("/").filter(Boolean).pop() : ""

  // Get title from query params if available
  const queryTitle = searchParams?.get("pageTitle") || ""

  // Try to get title/tags from navigation state (if available)
  let navTitle = ""
  let navTags: string[] = []
  if (typeof window !== "undefined" && window.history.state && window.history.state.usr) {
    navTitle = window.history.state.usr.title || ""
    navTags = window.history.state.usr.tags || []
  }

  const [post, setPost] = useState<BlogType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    setError("")
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL
    fetch(`${apiBase}/blog/post/${slug}/`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch post")
        return res.json()
      })
      .then(data => {
        setPost(data)
        setLoading(false)
      })
      .catch(() => {
        setError("Could not load post.")
        setLoading(false)
      })
  }, [slug])

  // Skeleton loader
  const Skeleton = () => (
    <div className="animate-pulse space-y-6">
      <div className="h-8 bg-muted rounded w-2/3" />
      <div className="h-5 bg-muted rounded w-1/3" />
      <div className="h-4 bg-muted rounded w-1/4" />
      <div className="h-64 bg-muted rounded w-full" />
    </div>
  )

  // Use query param, navigation state, or fetched data for title
  const title = queryTitle || navTitle || post?.title || ""
  const tags = navTags.length > 0 ? navTags : (post?.tags ? post.tags.split(",") : [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation/>
      <main className="max-w-3xl mx-auto px-6 sm:px-8 pt-32 pb-20">
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all posts
        </Link>
        <header className="mb-12 space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground font-mono">
            <time dateTime={post?.date || ""}>{post?.date || ""}</time>
            {post?.readTime && <><span>•</span><span>{post.readTime}</span></>}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-balance leading-tight">
            {title}
          </h1>
          {post?.excerpt && (
            <p className="text-xl sm:text-2xl text-muted-foreground text-pretty leading-relaxed">{post.excerpt}</p>
          )}
          <div className="flex flex-wrap gap-2 pt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs border border-border rounded-full text-muted-foreground hover:border-muted-foreground/50 transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>
        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <div className="space-y-6 text-foreground/90 leading-relaxed">
            {loading ? (
              <Skeleton />
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : post ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : null}
          </div>
        </article>
      </main>
    </div>
  )
}
