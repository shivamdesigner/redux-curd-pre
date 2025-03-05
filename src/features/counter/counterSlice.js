import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0,
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            if(state.value > 0 ){
                state.value -= 1
            }
        },
        reset:(state)=>{
            state.value = initialState.value
        },
        incrementByAmount: (state, action) => {
            state.value += num(action.payload)
        }
    }
})

export const {increment,decrement,reset,incrementByAmount} = counterSlice.actions

export default counterSlice.reducer