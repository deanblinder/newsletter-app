import axios from "axios";
import {endpoints} from "../../../endpoints";

const ERRORS = {
    FETCHING_ARTICLES_ERROR : 'error fetching articles',
}

const getArticles = async (pageNumber:number,query:string,category:string) => {
    console.log(pageNumber,query,category)
    try {
        return await axios.get(endpoints.articles(pageNumber,query,category));
    }catch (err){
        console.error(ERRORS.FETCHING_ARTICLES_ERROR,err);
    }
}

export const articlesActions = {
    getArticles
}
