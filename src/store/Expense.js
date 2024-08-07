import { createSlice, current } from "@reduxjs/toolkit";
// import { useEffect } from "react";
// import axios from "axios";


  const initialExpenseStore = {
    expenses: [],
    totalExpenseAmount:0,
    currentPage:1,
    hasNextPage:false,
    nextPage:null,
    hasPreviousPage:false, 
    previousPage:null, 
    lastPage:null,
    rowPerPage:10
  };

const ExpenseSlice=createSlice({
    name:'Expense',
    initialState:initialExpenseStore,
    reducers:{
        addExpense(state,action){
            // const response=await axios.post(`https://expense-tracker-fdf40-default-rtdb.firebaseio.com/expenses.json`,expense)
    //    console.log(response)
        // setExpenses([...expenses,expense])
        state.expenses.push(action.payload)
        state.totalExpenseAmount=state.totalExpenseAmount+parseInt(action.payload.amount)
        console.log(action)
        },
        deleteExpense(state,action){
            // const response=await axios.delete(`https://expense-tracker-fdf40-default-rtdb.firebaseio.com/expenses/${deletedExpense.id}.json`)
    //    console.log(response)
       const updatedExpenses=state.expenses.filter((expense)=>{
        return expense.id!=action.payload.id
       })
    //    setExpenses(updatedExpenses)
    state.expenses=updatedExpenses
    state.totalExpenseAmount=state.totalExpenseAmount-parseInt(action.payload.amount)
    console.log(state.totalExpenseAmount)
        },
        editExpense(state,action){
            // const response=await axios.put(`https://expense-tracker-fdf40-default-rtdb.firebaseio.com/expenses/${editExpense.id}.json`,editExpense)
    //    console.log(response)
       const updatedExpenses=[]
       for (let index = 0; index <state.expenses.length; index++) {
        const element = state.expenses[index];
        if(element.id==action.payload.id){
          state.totalExpenseAmount=state.totalExpenseAmount-parseInt(element.amount)
            element.amount=action.payload.amount
            state.totalExpenseAmount=state.totalExpenseAmount+parseInt(element.amount)
            element.description=action.payload.description
            element.category=action.payload.category
        }
        updatedExpenses.push(element)
       }
       console.log(updatedExpenses)
    //    setExpenses(updatedExpenses)
    state.expenses=updatedExpenses
        },
        resetExpense(state,action){
          state.expenses=[]
          state.totalExpenseAmount=0
          console.log(state)
        },
        setPagination(state,action){
          state.currentPage=action.payload.currentPage
          state.hasNextPage=action.payload.hasNextPage
          state.nextPage=action.payload.nextPage
          state.hasPreviousPage=action.payload.hasPreviousPage
          state.previousPage=action.payload.previousPage
          state.lastPage=action.payload.lastPage
        },
        setRowPerPage(state,action){
          state.rowPerPage=action.payload.rowPerPage
        }
    }
})

export const ExpenseReducer=ExpenseSlice.reducer
export const ExpenseActions=ExpenseSlice.actions