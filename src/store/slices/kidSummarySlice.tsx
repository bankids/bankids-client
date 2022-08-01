import { TFetchStatus } from '@lib/types/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';

export type TKidSummaryState = {
  kidSummary: {
    currentSavings: number;
    totalPrice: number;
  } | null;
  kidSummaryStatus?: TFetchStatus;
};

const initialState: TKidSummaryState = {
  kidSummary: null,
  kidSummaryStatus: 'idle',
};

// GET: 자녀 홈 페이지 Summary 컴포넌트를 위한 주간 진행상황 fetch
export const fetchKidSummary = createAsyncThunk(
  'kidSummary/fetch',
  async (thunkPayload: { axiosPrivate: AxiosInstance }) => {
    const { axiosPrivate } = thunkPayload;
    const response = await axiosPrivate.get('/challenge/progress');
    return response.data;
  },
);

export const kidSummarySlice = createSlice({
  name: 'kidSummary',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchKidSummary.pending, (state) => {
        state.kidSummaryStatus = 'loading';
      })
      .addCase(fetchKidSummary.fulfilled, (state, action) => {
        state.kidSummaryStatus = 'succeeded';
        state.kidSummary = action.payload.data;
      })
      .addCase(fetchKidSummary.rejected, (state, action) => {
        state.kidSummaryStatus = 'failed';
        console.error(action.error.message);
      });
  },
});

export const selectKidSummaryStatus = (state: RootState) =>
  state.kidSummary.kidSummaryStatus;
export const selectKidSummary = (state: RootState) =>
  state.kidSummary.kidSummary;
export default kidSummarySlice.reducer;
