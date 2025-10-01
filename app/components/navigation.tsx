"use client"

import Link from "next/link"
import ThemeToggle from "@/app/components/themeToggle";


export function Navigation() {
	return (
		<nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
			<div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
				<div className="flex items-center justify-between h-16">
					{/* Logo/Name */}
					<Link href="/" className="text-lg font-medium hover:text-muted-foreground transition-colors duration-300">
						Hossein Yaghoubi
					</Link>

					{/* Navigation Links and Theme Toggle */}
					<div className="flex items-center gap-6 sm:gap-8">
						<Link
							href="/blog"
							className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
						>
							Blog
						</Link>
						{/*<Link
              href="#work"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Services
            </Link>*/}
						<Link
							href="#connect"
							className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
						>
							Get in Touch
						</Link>

						<ThemeToggle></ThemeToggle>

					</div>
				</div>
			</div>
		</nav>
	)
}
