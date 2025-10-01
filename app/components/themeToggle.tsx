// components/ThemeToggle.tsx
'use client';

import {useEffect, useState} from 'react';

export default function ThemeToggle() {
	const [isDark, setIsDark] = useState<boolean | null>(null);

	// Initialise from localStorage / prefers‑color‑scheme
	useEffect(() => {
		const stored = localStorage.getItem('theme');
		let dark: boolean;
		if (stored) {
			dark = stored === 'dark';
		} else {
			dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		}
		setIsDark(dark);
		// No need to toggle document class here; handled in layout.tsx
	}, []);

	const toggleTheme = () => {
		const next = !(isDark ?? false);
		setIsDark(next);
		localStorage.setItem('theme', next ? 'dark' : 'light');
		// optional: update document class
		document.documentElement.classList.toggle('dark', next);
	};

	// While we don’t know the theme yet, render nothing (or a placeholder)
	if (isDark === null) return null;

	return (
		<button
			onClick={toggleTheme}
			className="group p-2 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
			aria-label="Toggle theme"
		>
			{isDark ? (
				<svg
					className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path
						fillRule="evenodd"
						d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
						clipRule="evenodd"
					/>
				</svg>
			) : (
				<svg
					className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
				</svg>
			)}
		</button>
	);
}
