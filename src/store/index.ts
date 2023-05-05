import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import articlesReducer from './reducers/articlesReducer'

export const store = configureStore({
  reducer: {
    user: userReducer,
    articles: articlesReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch