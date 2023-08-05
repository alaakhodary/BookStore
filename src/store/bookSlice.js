import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { logInsert } from "./reportSlice";

export const getBooks = createAsyncThunk(
  "book/getBooks",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI; // rejectWithValue => for handle errors
    try {
      const res = await fetch("http://localhost:3005/books");
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const insertBook = createAsyncThunk(
  "book/insertBook",
  async (bookData, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    try {
      bookData.userName = getState().auth.name;
      const res = await fetch("http://localhost:3005/books", {
        method: "POST",
        body: JSON.stringify(bookData),
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
      const data = await res.json();
      dispatch(logInsert({ name: "insertBook", status: "success" }));
      return data;
    } catch (error) {
      dispatch(logInsert({ name: "insertBook", status: "failed" }));
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "book/deleteBook",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(`http://localhost:3005/books/${item.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
      return item;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getBookInfo = createAsyncThunk(
  "book/getBookInfo",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(`http://localhost:3005/books/${item.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
      return item;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState: { books: [], isLoading: false, error: null, bookInfo: null },
  extraReducers: (builder) => {
    // getBooks
    builder
      .addCase(getBooks.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // insert book
    builder
      .addCase(insertBook.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(insertBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books.push(action.payload);
      })
      .addCase(insertBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // delete book
    builder
      .addCase(deleteBook.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = state.books.filter((el) => el.id !== action.payload.id);
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // getBookInfo
    builder.addCase(getBookInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.bookInfo = action.payload;
    });
  },
});

export default bookSlice.reducer;
