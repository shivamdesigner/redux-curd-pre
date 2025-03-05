import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: [],
    loading: false,
    error: null,
    searchData: [],
}

export const createUser = createAsyncThunk("createUser", async (data, { rejectWithValue }) => {
    console.log("data", data)
    const response = await fetch("https://67c0364ab9d02a9f2248c75d.mockapi.io/curd", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    try {
        const result = await response.json();
        return result;
    } catch (error) {
        rejectWithValue(error)
    }
})
// read add data
export const allUser = createAsyncThunk("allUser", async (data, { rejectWithValue }) => {
    const response = await fetch("https://67c0364ab9d02a9f2248c75d.mockapi.io/curd");
    try {
        const result = await response.json();
        return result;
    } catch (error) {
        rejectWithValue(error)
    }
})

// deleteUser data by id
export const deleteUser = createAsyncThunk("deleteUser", async (id, { rejectWithValue }) => {
    const response = await fetch(`https://67c0364ab9d02a9f2248c75d.mockapi.io/curd/${id}`, { method: "DELETE" });
    try {
        const result = await response.json();
        console.log("user delete data", result)
        return result;
    } catch (error) {
        rejectWithValue(error)
    }
})
export const updateUserData = createAsyncThunk("update User Data", async (data, { rejectWithValue }) => {

    const response = await fetch(`https://67c0364ab9d02a9f2248c75d.mockapi.io/curd/${data.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    console.log("data response", response.status)
    try {
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Update failed:", error); // Debug log
        return rejectWithValue(error.message);
    }
})


export const userDetail = createSlice({
    name: 'userDetail',
    initialState,
    reducers: {
        searchUser: (state, action) => {
            console.log(action.payload);
            state.searchData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // createUser
            .addCase(createUser.pending, (state) => {
                state.loading = true
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false,
                    state.user.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload.message;
            })
            // allUser
            .addCase(allUser.pending, (state) => {
                state.loading = true
            })
            .addCase(allUser.fulfilled, (state, action) => {
                state.loading = false,
                    state.user = action.payload;
            })
            .addCase(allUser.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload.message;
            })
            // deleteUser
            .addCase(deleteUser.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                const { id } = action.payload
                if (id) {
                    state.user = state.user.filter((ele) => ele.id !== id);
                }
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload.message;
            })
            // updateUserData
            .addCase(updateUserData.pending, (state) => {
                state.loading = true
            })
            .addCase(updateUserData.fulfilled, (state, action) => {
                state.loading = false,
                    state.user = state.user.map((ele) =>
                        ele.id === action.payload.id ? action.payload : ele
                    );
            })
            .addCase(updateUserData.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload.message;
            })
    },
})


export default userDetail.reducer
export const { searchUser } = userDetail.actions;