import { createSlice } from "@reduxjs/toolkit"
import {   setDataToLocalStorage} from "./hooks/useLocalStorage"

const storedData = localStorage.getItem("List")

const initialState = {
    list: storedData ? JSON.parse(storedData) : [],
}

const taskSlice = createSlice({
    name : "task",
    initialState,
    reducers : {
        addTask(state,action) {
            state.list.push(action.payload)

            setDataToLocalStorage("List",JSON.stringify(state.list))
        },
        deleteTask(state, action) {
           state.list = state.list.filter(item => item.id !== action.payload)

          setDataToLocalStorage("List",JSON.stringify(state.list))
        },
        editTask:{
            prepare(id,newTask) {
                return {payload:{id,newTask}}
            },
        reducer(state,action) {
            state.list = state.list.map(item => item.id === action.payload.id ? action.payload.newTask : item)
            setDataToLocalStorage("List",JSON.stringify(state.list))
        }},
        editCheck:{
            prepare(id,checked,status) {
                return {payload:{id,checked,status}}
            },
        reducer(state,action) {
            // state.list = state.list.map(item => item.id === action.payload.id ? action.payload.checked : item)
          const item = state.list.find(item=>item.id === action.payload.id)
          item.checked = action.payload.checked,
          item.status = action.payload.status
        }}
    }
})




export const  {addTask , deleteTask ,editTask , editCheck} = taskSlice.actions

export const filteredCompletedStatus = state=>state.task.list.filter(item => item.status === "completed")
export const filteredInCompletedStatus = state=>state.task.list.filter(item => item.status === "incompleted")
export const filteredAllStatus = state=>state.task.list

export default taskSlice.reducer
