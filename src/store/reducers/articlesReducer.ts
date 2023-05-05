import { createSlice } from '@reduxjs/toolkit';

const initialState: ArticleData [] = []

export const articlesSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addAllArticles: (state, action)=>{
            return [...action.payload]
        }
    },
})

// Action creators are generated for each case reducer function
export const { addAllArticles } = articlesSlice.actions

export default articlesSlice.reducer