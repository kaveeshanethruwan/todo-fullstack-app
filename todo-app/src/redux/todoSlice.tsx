import { createSlice } from "@reduxjs/toolkit";
import { Todo } from "../types/todo";

interface HttpState {
  [key: string]: {
    loading: boolean;
    success: boolean;
    error: string | null;
  };
}

export interface TodoProps {
  data: Todo[] | null;
  http: HttpState;
}

const initialState: TodoProps = {
  data: [],
  http: {},
};

export const totoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    updateHttp: (state, action) => {
      state.http[action.payload.type] = {
        loading: action.payload.loading,
        success: action.payload.success,
        error: action.payload.error,
      };
      if (action.payload.type === "fetchTodos" || action.payload.type === "searchTodo") {
        state.data = action.payload.data;
      }
    },
  },
});

export default totoSlice.reducer;

export const { updateHttp } = totoSlice.actions;
