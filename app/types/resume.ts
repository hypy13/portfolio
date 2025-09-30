interface Work {
	year: { from: number, to: number };
	role: string;
	company: string;
	description: string;
	tech: string[];
}

interface Link {
	name: string;
	handle: string;
	url: string;
}

interface Project {
	name: string;
	link: string;
	excerpt: string;
	date: string;
}


export interface ResumeProp {
	intro: {
		name: string;
		family_name: string;
		focus_list: string[];
		intro: string;
		highlights: string[];
		email: string;
	},
	works: Work[];
	links: Link[];
	projects: Project[];
}