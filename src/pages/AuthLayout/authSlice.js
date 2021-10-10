import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import userApi from '../../api/userApi';
export const login = createAsyncThunk(
    'auth/login',
    async (payload) =>{
        const user = await userApi.login(payload);
        document.cookie = `token=${user.token}`;
        return {user : user.user , token : user.token};
    }
)
const authSlice = createSlice({
    name : 'auth',
    initialState : {
        current : {},
        settings :{},
        token : '',
    },
    reducers:{},
    extraReducers:{
        [login.fulfilled]:(state , action) =>{
            state.current = action.payload.user;
            state.token = action.payload.token
        }
    }
});
const { reducer} = authSlice;
export default reducer;