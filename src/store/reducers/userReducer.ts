import { createSlice } from '@reduxjs/toolkit'

const local = sessionStorage.getItem('user');
const user: UserData = local ? local.length > 0 && JSON.parse(local) : "";
const initialState: UserState = user ? { data: user, isAuthenticated: true} : {  data: null, isAuthenticated: false  }
 

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUserToState: (state, action) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        window.sessionStorage.setItem('user', JSON.stringify(action.payload));
        return {...state, isAuthenticated: true, data: {...action.payload}}
        },
        removeUserFromState: (state)=>{
            window.sessionStorage.removeItem("user");
            return { ...state, isAuthenticated: false, data: null }
        }
    },
})

// Action creators are generated for each case reducer function
export const { addUserToState, removeUserFromState } = userSlice.actions

export default userSlice.reducer