"use client"

import {ResumeProp} from "@/app/types/resume";

interface WorkSectionProps {
	sectionRef: (el: HTMLElement | null) => void,
	resume: ResumeProp,
}

export function WorkSection({sectionRef, resume: {works}}: WorkSectionProps) {

	return (
		<section
			id="work"
			ref={sectionRef}
			className="min-h-screen py-20 sm:py-32 opacity-0"
		>
			<div className="space-y-12 sm:space-y-16">
				<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
					<h2 className="text-3xl sm:text-4xl font-light">Work Path</h2>
					<div className="text-sm text-muted-foreground font-mono">
						{
							works && works.length > 0 ? (
								`${works.at(-1)!.year.to} — ${works[0].year.from}`
							) : (
								'—'
							)
						}
					</div>
				</div>

				<div className="space-y-8 sm:space-y-12">
					{works.map((job, index) => (
						<div
							key={index}
							className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
						>
							<div className="lg:col-span-2">
								<div
									className=" font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
									{job.year.from} -
									{job.year.to}
								</div>
							</div>

							<div className="lg:col-span-6 space-y-3">
								<div>
									<h3 className="text-lg sm:text-xl font-medium">{job.role}</h3>
									<div className="text-muted-foreground">{job.company}</div>
								</div>
								<p className="text-muted-foreground leading-relaxed max-w-lg">{job.description}</p>
							</div>

							<div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
								{job.tech.map((tech) => (
									<span
										key={tech}
										className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
									>
                    {tech}
                  </span>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
