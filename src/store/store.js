import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import userDetail from '../features/user-detail/userDetails'
import authReducer from '../features/auth/authSlice'
import ProjectSlice from '../features/project/ProjectSlice'
export const store = configureStore({
    reducer: {
        counter2: counterReducer,
        app: userDetail,
        auth: authReducer,
        project: ProjectSlice,
    }
})