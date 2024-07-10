import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiSummary from '../common/ApiSummary.jsx';

export const fetchUserProfile = createAsyncThunk('user/fetchProfile', async () => {
  const response = await fetch(ApiSummary.getUser.url, {
    method: ApiSummary.getUser.method,
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
});

const initialState = {
  user: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
    },
    updateUserDetails: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setUserDetails, updateUserDetails } = userSlice.actions;

export default userSlice.reducer;