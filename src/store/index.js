import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Auth";
import { ExpenseReducer } from "./Expense";
import { ThemeReducer } from "./Theme";
import { chatReducer } from "./Chat";

const store=configureStore({
    reducer:{expense:ExpenseReducer,auth:authReducer,theme:ThemeReducer,chat:chatReducer}
})

export default store
