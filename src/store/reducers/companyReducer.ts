import { createSlice } from '@reduxjs/toolkit';

const initialState: CompanyData [] = []

export const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        addAllCompanies: (state, action)=>{
            return [...action.payload]
        }
    },
})

// Action creators are generated for each case reducer function
export const { addAllCompanies } = companySlice.actions

export default companySlice.reducer