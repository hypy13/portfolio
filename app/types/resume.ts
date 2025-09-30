interface Work {
	year: { from: number, to: number },
	role: string,
	company: string,
	description: string,
	tech: string[],
}

interface Link {
	name: string,
	handle: string,
	url: string,
}


export interface ResumeProp {
	intro: {
		/** First name */
		name: string;
		/** Last name */
		family_name: string;
		/** Short list of focus areas (e.g., ["frontend", "devops"]) */
		focus_list: string[];
		/** One‑sentence intro/summary */
		intro: string;
		/** Array of highlight strings (awards, achievements, etc.) */
		highlights: string[];
		email: string;
	},
	works: Work[];
	links: Link[];
}