
export const endpoints = {
    articles: (pageNumber:number,query?:string,category?:string) => `https://newsapi.org/v2/top-headlines?category=${category ?? 'general'}&page=${pageNumber}&pageSize=${10}&q=${query?.length ?? ''}&apiKey=905333fb221a414fa087f5960e4346c6`,
}
