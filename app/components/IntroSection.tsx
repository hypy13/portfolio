"use client"
import {ResumeProp} from "../types/resume";

interface IntroSectionProps {
	sectionRef: (el: HTMLElement | null) => void,
	resume: ResumeProp,
}

const renderHighlightedText = (text: string, wordsToHighlight: string[]) => {
	const parts = text.split(new RegExp(`(${wordsToHighlight.join('|')})`, 'gi'));

	return parts.map((part: string, i: number) =>
		wordsToHighlight.some(word => word.toLowerCase() === part.toLowerCase()) ? (
			<span key={i} className="text-foreground">{part}</span>
		) : part
	);
};

export function IntroSection({sectionRef, resume}: IntroSectionProps) {
	const year = new Date().getFullYear();

	return (
		<header
			id="intro"
			ref={sectionRef}
			className="min-h-screen flex items-center opacity-0"
		>
			{/* ...existing code for intro section... */}
			<div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
				<div className="lg:col-span-3 space-y-6 sm:space-y-8">
					<div className="space-y-3 sm:space-y-2">
						<div className="text-sm text-muted-foreground font-mono tracking-wider">PORTFOLIO
							/ {year}</div>
						<h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
							{resume.intro.name}
							<br/>
							<span className="text-muted-foreground">{resume.intro.family_name}</span>
						</h1>
					</div>

					<div className="space-y-6 max-w-md">
						<p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
							{renderHighlightedText(resume.intro.intro, resume.intro.highlights)}
						</p>

						<div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
							<div className="flex items-center gap-2">
								<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
								Available for work
							</div>
							<div>Iran</div>
						</div>
					</div>
				</div>

				<div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
					<div className="space-y-4">
						<div className="text-sm text-muted-foreground font-mono">CURRENTLY</div>
						<div className="space-y-2">
							<div className="text-foreground">Backend Developer</div>
							<div className="text-muted-foreground">@Itima</div>
							<div className="text-xs text-muted-foreground">2024 — Present</div>
						</div>
					</div>

					<div className="space-y-4">
						<div className="text-sm text-muted-foreground font-mono">FOCUS</div>
						<div className="flex flex-wrap gap-2">
							{resume.intro.focus_list.map((skill) => (
								<span
									key={skill}
									className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
								>
                  {skill}
                </span>
							))}
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

