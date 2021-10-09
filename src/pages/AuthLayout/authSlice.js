import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import userApi from '../../api/userApi';
export const login = createAsyncThunk(
    'auth/login',
    async (payload) =>{
        const user = await userApi.login(payload);
        localStorage.setItem('access_token' , user.token);
        localStorage.setItem('user' , JSON.stringify(user.user));

        return user.user;
    }
)
const authSlice = createSlice({
    name : 'auth',
    initialState : {
        current : JSON.parse(localStorage.getItem('user')) || {},
        settings :{},
    },
    reducers:{},
    extraReducers:{
        [login.fulfilled]:(state , action) =>{
            state.current = action.payload;
        }
    }
});
const { reducer} = authSlice;
export default reducer;