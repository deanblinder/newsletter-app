import  {createSlice} from "@reduxjs/toolkit";
import {Article} from "../articles/types";

const mainPageSlice = createSlice({
    name:'mainPage',
    initialState:{
        query:<string> '',
        category:<string> '',
        articles:<Article[]> [],
        pageNumber:<number> 1
    },
    reducers:{
        addArticles:(state, action) => {
            state.articles.push(...action.payload)
        },
        setArticles:(state, action) => {
            state.articles = action.payload
        },
        setQuery:(state,action) => {
            state.query = action.payload
        },
        setCategory:(state,action)=>{
            state.category = action.payload
        },
        setPageNumber:(state,action)=>{
            state.pageNumber = action.payload
        }
    }
})

export const addArticles = mainPageSlice.actions.addArticles
export const setArticles = mainPageSlice.actions.setArticles
export const setQuery = mainPageSlice.actions.setQuery
export const setCategory = mainPageSlice.actions.setCategory
export const setPageNumber = mainPageSlice.actions.setPageNumber

export default mainPageSlice.reducer;
