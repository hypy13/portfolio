export interface BlogListType {
	count: number;
	next: string;
	previous: string;
	results: BlogType[];
}

export interface BlogType {
	slug: string;
	title: string;
	excerpt: string;
	date: string;
	content: string;
	readTime: string;
	tags: string;
}
