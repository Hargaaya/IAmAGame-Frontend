interface TenorGif {
	id: string;
	title: string;
	media_formats: {
		nanomp4: MediaFormat;
		tinywebm: MediaFormat;
		tinygifpreview: MediaFormat;
		nanowebm: MediaFormat;
		gif: MediaFormat;
		nanogifpreview: MediaFormat;
		tinygif: MediaFormat;
		gifpreview: MediaFormat;
		mediumgif: MediaFormat;
		nanogif: MediaFormat;
		mp4: MediaFormat;
		loopedmp4: MediaFormat;
		tinymp4: MediaFormat;
		webm: MediaFormat;
	};
	created: number;
	content_description: string;
	itemurl: string;
	url: string;
	tags: string[];
	flags: string[];
	hasAudio: boolean;
}

interface MediaFormat {
	url: string;
	duration: number;
	preview: string;
	dims: number[];
	size: number;
}
