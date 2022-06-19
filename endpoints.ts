
export const endpoints = {
    articles: (pageNumber:number,query?:string,category?:string) => `https://newsapi.org/v2/top-headlines?category=${category ?? 'general'}&page=${pageNumber}&pageSize=${10}&q=${query?.length ?? ''}&apiKey=1d7c01d251f648da83b7d1e7cdeafbc2`,
}
