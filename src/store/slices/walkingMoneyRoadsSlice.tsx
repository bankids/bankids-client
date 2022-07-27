import { TFetchStatus } from '@lib/types/api';
import {
  TChallengeCategory,
  TInterestRate,
  TMoneyRoadStatus,
} from '@lib/types/common';
import { TItemName } from '@lib/types/kid';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';

export interface IMoneyRoad {
  id: number;
  isMom: boolean;
  title: string;
  itemName: TItemName;
  challengeCategoryName: TChallengeCategory;
  isAchieved: boolean;
  interestRate: TInterestRate;
  totalPrice: number;
  weekPrice: number;
  weeks: number;
  createdAt: string;
  status: TMoneyRoadStatus;
  progressList:
    | {
        challengeId: number;
        weeks: number;
        isAchieved: boolean;
      }[]
    | null;
  comment: string | null;
}

export type TWalkingMoneyRoadsState = {
  walkingMoneyRoads: IMoneyRoad[] | null;
  walkingMoneyRoadsStatus?: TFetchStatus;
};

const initialState: TWalkingMoneyRoadsState = {
  walkingMoneyRoads: null,
  walkingMoneyRoadsStatus: 'idle',
};

// GET: 걷고있는 돈길 데이터 fetch
export const fetchWalkingMoneyRoads = createAsyncThunk(
  'walkingMoneyRoads/fetchWalkingMoneyRoads',
  async (thunkPayload: { axiosPrivate: AxiosInstance }) => {
    const { axiosPrivate } = thunkPayload;
    const response = await axiosPrivate.get('/challenge/?status=accept');
    return response.data;
  },
);

export const walkingMoneyRoadsSlice = createSlice({
  name: 'walkingMoneyRoads',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchWalkingMoneyRoads.pending, (state) => {
        state.walkingMoneyRoadsStatus = 'loading';
      })
      .addCase(fetchWalkingMoneyRoads.fulfilled, (state, action) => {
        state.walkingMoneyRoadsStatus = 'succeeded';
        state.walkingMoneyRoads = action.payload.data;
      })
      .addCase(fetchWalkingMoneyRoads.rejected, (state, action) => {
        state.walkingMoneyRoadsStatus = 'failed';
        console.error(action.error.message);
      });
  },
});

export const selectWalkingMoneyRoadsStatus = (state: RootState) =>
  state.walkingMoneyRoads.walkingMoneyRoadsStatus;
export const selectWalkingMoneyRoads = (state: RootState) =>
  state.walkingMoneyRoads.walkingMoneyRoads;
export default walkingMoneyRoadsSlice.reducer;
