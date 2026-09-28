export type TocItem = { id: string; text: string; depth: 2 | 3 };

export type RenderedMarkdown = {
  html: string;
  toc: TocItem[];
  readingMinutes: number;
};
