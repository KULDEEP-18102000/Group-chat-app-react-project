import React from "react";

const expenseContext=React.createContext({
    expenses:[],
    addExpense:()=>{}
})

export default expenseContext