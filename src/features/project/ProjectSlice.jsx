import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    projects: [],
    loading: false,
    error: null,
}

export const createProject = createAsyncThunk("createProject", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(
            'https://67c0364ab9d02a9f2248c75d.mockapi.io/project'
            , data
        );
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
});
export const viewProject = createAsyncThunk("viewProject", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            'https://67c0364ab9d02a9f2248c75d.mockapi.io/project'

        );
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const deleteProject = createAsyncThunk("deleteProject", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`
            https://67c0364ab9d02a9f2248c75d.mockapi.io/project/${id}
            `
        );
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const editProject = createAsyncThunk("editProject", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.put(
            `https://67c0364ab9d02a9f2248c75d.mockapi.io/project/${data.id}`, data
        );
        console.log("edit data", response.data)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
});


export const ProjectSlice = createSlice({
    name: 'projectDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // crete
            .addCase(createProject.pending, (state) => {
                state.loading = true
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.loading = false,
                    state.projects.push(action.payload)
            })
            .addCase(createProject.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload.message;
            })
            // read
            .addCase(viewProject.pending, (state) => {
                state.loading = true
            })
            .addCase(viewProject.fulfilled, (state, action) => {
                state.loading = false,
                    state.projects = action.payload;
            })
            .addCase(viewProject.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload.message;
            })
            // delete
            .addCase(deleteProject.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.loading = false;
                const { id } = action.payload
                if (id) {
                    state.projects = state.projects.filter((ele) => ele.id !== id)
                }
            })
            .addCase(deleteProject.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload.message;
            })
            // edit
            .addCase(editProject.pending, (state) => {
                state.loading = true
            })
            .addCase(editProject.fulfilled, (state, action) => {
                state.loading = false,
                    state.projects = state.projects.map((ele) =>
                        ele.id === action.payload.id ? action.payload : ele
                    )
            })
            .addCase(editProject.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload.message;
            })
    }
})

export default ProjectSlice.reducer
export const { searchProject } = ProjectSlice.actions