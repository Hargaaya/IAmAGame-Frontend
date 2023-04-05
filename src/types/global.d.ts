export interface TenorGif {
  id: string;
  title: string;
  media_formats: {
    nanomp4: media_format;
    tinywebm: media_format;
    tinygifpreview: media_format;
    nanowebm: media_format;
    gif: media_format;
    nanogifpreview: media_format;
    tinygif: media_format;
    gifpreview: media_format;
    mediumgif: media_format;
    nanogif: media_format;
    mp4: media_format;
    loopedmp4: media_format;
    tinymp4: media_format;
    webm: media_format;
  };
  created: number;
  content_description: string;
  itemurl: string;
  url: string;
  tags: string[];
  flags: string[];
  hasAudio: boolean;
}

export interface media_format {
  url: string;
  duration: number;
  preview: string;
  dims: number[];
  size: number;
}