import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type InitialState = {
    value: AuthState;
}

type AuthState = {
    isAuth: boolean;
    email: string;
}

const initialState = {
    value: {
        isAuth: false,
        email: '',
    } as AuthState,
} as InitialState;

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: () => {
            return initialState;
        },
        logIn: (state, action: PayloadAction<string>) => {
            return {
                value: {
                    isAuth: true,
                    email: action.payload
                }
            }
        }
    },
});

export const { logOut, logIn } = authSlice.actions;
export default authSlice.reducer;