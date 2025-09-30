"use client"

import Link from "next/link"
import {useEffect, useRef, useState} from "react"
import {Navigation} from "@/app/components/navigation"
import {IntroSection} from "@/app/components/IntroSection"
import {WorkSection} from "@/app/components/WorkSection"
import {ProjectsSection} from "@/app/components/ProjectsSection"
import {ConnectSection} from "@/app/components/ConnectSection"
import {FooterSection} from "@/app/components/FooterSection"
import {ResumeProp} from "@/app/types/resume";

export default function Home() {
	const [isDark, setIsDark] = useState(true)
	const [activeSection, setActiveSection] = useState("")
	const sectionsRef = useRef<(HTMLElement | null)[]>([])
	const resume: ResumeProp = {
		projects: [
			{
				name: "django daisy",
				link: 'https://github.com/hypy13/django-daisy/',
				excerpt: 'A modern django  dashboard built with daisyui ',
				date: 'Sep 2024'
			},
			// {
			// 	name: "HabibApp",
			// 	link: 'https://habibapp.com',
			// 	excerpt: 'super application with services for everybody',
			// 	date: 'Jan 2021'
			// },
			{
				name: "RomanExplore",
				link: 'https://romanexplore.com/',
				excerpt: 'tour guiding and programmes in rom',
				date: 'Dec 2024'
			},
			{
				name: "Fundiran",
				link: 'https://fundiran.net/',
				excerpt: 'platform for investors and investees',
				date: 'Sep 2023'
			},
		],
		links: [
			{handle: "@hypy13", name: "Github", url: "https://github.com/hypy13/"},
			{handle: "@yaghoubi76", name: "Linkedin", url: "https://www.linkedin.com/in/yaghoubi76/"},
			{handle: "@hypyt", name: "Telegram", url: "https://t.me/hypyt/"},
		],
		intro: {
			email: "hossein.yaghoubi13@gmail.com",
			name: "Hossein",
			family_name: "Yaghoubi",
			focus_list: ['Django', 'Python', 'Devops', 'Linux', 'RAG', 'Machin Learning'],
			intro: "Backend Developer crafting digital experiences at the intersection of Code, Scalability and Usability",
			highlights: ['Code', 'Scalability', 'Usability'],
		},
		works: [
			{
				company: "Itima",
				description: "built special scalable platforms for accounting and developed automation bot",
				role: "Senior Backend Developer",
				tech: ["Python", "Django", "Bot Automation"],
				year: {from: 2023, to: 2025}
			},
			{
				company: "New Horizon",
				description: "Built international and multilingual applications ",
				role: "Django Backend Developer",
				tech: ["Django", "DRF", "Documenting", "DevOps", "Monitoring"],
				year: {from: 2021, to: 2023},
			},
			{
				company: "Mahab-IT",
				description: "built reservation platform for hotels and airlines",
				role: "Laravel Backend Developer",
				tech: ["PHP", "Laravel", "API",],
				year: {from: 2018, to: 2019},
			},
		]
	}

	useEffect(() => {
		document.documentElement.classList.toggle("dark", isDark)
	}, [isDark])

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("animate-fade-in-up")
						setActiveSection(entry.target.id)
					}
				})
			},
			{threshold: 0.3, rootMargin: "0px 0px -20% 0px"},
		)

		sectionsRef.current.forEach((section) => {
			if (section) observer.observe(section)
		})

		return () => observer.disconnect()
	}, [])

	const toggleTheme = () => {
		setIsDark(!isDark)
	}

	return (
		<div className="min-h-screen bg-background text-foreground relative">
			<Navigation isDark={isDark} toggleTheme={toggleTheme}/>

			<nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
				<div className="flex flex-col gap-4">
					{["intro", "work", "projects", "connect"].map((section, idx) => (
						<button
							key={section}
							onClick={() => document.getElementById(section)?.scrollIntoView({behavior: "smooth"})}
							className={`w-2 h-8 rounded-full transition-all duration-500 ${
								activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
							}`}
							aria-label={`Navigate to ${section}`}
						/>
					))}
				</div>
			</nav>

			<main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 pt-16">
				<IntroSection sectionRef={(el) => (sectionsRef.current[0] = el)} resume={resume}/>
				<WorkSection sectionRef={(el) => (sectionsRef.current[1] = el)} resume={resume}/>
				<ProjectsSection sectionRef={(el) => (sectionsRef.current[2] = el)} resume={resume}/>
				<ConnectSection sectionRef={(el) => (sectionsRef.current[3] = el)} resume={resume}/>
				<FooterSection/>
			</main>

			<div
				className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
		</div>
	)
}
