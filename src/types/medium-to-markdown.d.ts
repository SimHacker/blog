declare module 'medium-to-markdown' {
  function convertFromUrl(url: string): Promise<string>;
  export = { convertFromUrl };
}
