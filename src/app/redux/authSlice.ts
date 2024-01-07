import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type InitialState = {
    value: AuthState;
}

type Product = {
    id: number;
    title: string;
}

type AuthState = {
    isAuth: boolean;
    email: string;
    cartItems: Product[];
}

const initialState = {
    value: {
        isAuth: false,
        email: '',
        cartItems: [],
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
                    cartItems: [],
                    email: action.payload
                }
            }
        },
        addCartItem: (state, action) => {
            if (state.email) {
                state.email.cartItems = action.payload.cartItems;
            } else {
                console.log('error');
            }
        },
        setEmptyCart: (state) => {
            if (state.email) {
                state.email.cartItems = [];
            } else {
                console.log('error');
            }
        }
    },
});

export const { logOut, logIn, addCartItem, setEmptyCart } = authSlice.actions;
export default authSlice.reducer;