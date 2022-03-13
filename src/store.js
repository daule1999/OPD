import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './feautures/counter/counterSlice'
export default configureStore({
  reducer: {
    counter: counterReducer,
  },
})