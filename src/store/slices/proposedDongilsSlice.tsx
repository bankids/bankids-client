import { TFetchStatus } from '@lib/types/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../app/store';
import { IDongil } from './walkingDongilSlice';

interface IProposedDongil {
  userName: string;
  isFemale: boolean;
  challengeList: IDongil[];
}

export type TProposedDongilsState = {
  proposedDongils: IProposedDongil[] | null;
  proposedDongilsStatus?: TFetchStatus;
};

const initialState: TProposedDongilsState = {
  proposedDongils: [
    {
      userName: '테스트1',
      isFemale: false,
      challengeList: [
        {
          id: 100,
          isMom: false,
          title: '엄마 생일선물',
          itemName: '선물',
          challengeCategory: '이자율 받기',
          isAchieved: 2,
          interestRate: 10,
          totalPrice: 50000,
          weekPrice: 8000,
          successWeeks: 0,
          weeks: 6,
          createdAt: '2022-07-27 06:30:02',
          status: 0,
          progressList: null,
          comment: null,
        },
        {
          id: 101,
          isMom: false,
          title: '엄마 생일선물',
          itemName: '선물',
          challengeCategory: '이자율 받기',
          isAchieved: 2,
          interestRate: 10,
          totalPrice: 50000,
          weekPrice: 8000,
          successWeeks: 0,
          weeks: 6,
          createdAt: '2022-07-27 06:30:02',
          status: 0,
          progressList: null,
          comment: null,
        },
      ],
    },
    {
      userName: '테스트2',
      isFemale: false,
      challengeList: [
        {
          id: 102,
          isMom: false,
          title: '엄마 생일선물',
          itemName: '선물',
          challengeCategory: '이자율 받기',
          isAchieved: 2,
          interestRate: 10,
          totalPrice: 50000,
          weekPrice: 8000,
          successWeeks: 0,
          weeks: 6,
          createdAt: '2022-07-27 06:30:02',
          status: 0,
          progressList: null,
          comment: null,
        },
        {
          id: 103,
          isMom: false,
          title: '엄마 생일선물',
          itemName: '선물',
          challengeCategory: '이자율 받기',
          isAchieved: 2,
          interestRate: 10,
          totalPrice: 50000,
          weekPrice: 8000,
          successWeeks: 0,
          weeks: 6,
          createdAt: '2022-07-27 06:30:02',
          status: 0,
          progressList: null,
          comment: null,
        },
      ],
    },
  ],
  proposedDongilsStatus: 'idle',
};

// GET: 제안받은 돈길 조회
export const fetchProposedDongils = createAsyncThunk(
  'proposedDongils/fetch',
  async (thunkPayload: { axiosPrivate: AxiosInstance; kidId: number }) => {
    const { axiosPrivate, kidId } = thunkPayload;
    const response = await axiosPrivate.get(
      `/challenge/kid/${kidId}?status=pending`,
    );
    return response.data;
  },
);

export const proposedDongilsSlice = createSlice({
  name: 'proposedDongils',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProposedDongils.pending, (state) => {
        state.proposedDongilsStatus = 'loading';
      })
      .addCase(fetchProposedDongils.fulfilled, (state, action) => {
        state.proposedDongilsStatus = 'succeeded';
        if (state.proposedDongils === null) {
          state.proposedDongils = [];
          state.proposedDongils[0] = action.payload.data;
        } else {
          state.proposedDongils = state.proposedDongils.concat(
            action.payload.data,
          );
        }
        console.log(state.proposedDongils);
      })
      .addCase(fetchProposedDongils.rejected, (state, action) => {
        state.proposedDongilsStatus = 'failed';
        console.error(action.error.message);
      });
  },
});

export const selectProposedDongilsStatus = (state: RootState) =>
  state.proposedDongils.proposedDongilsStatus;
export const selectProposedDongils = (state: RootState) =>
  state.proposedDongils.proposedDongils;
export default proposedDongilsSlice.reducer;

// https://github.com/reduxjs/reselect#q-how-do-i-create-a-selector-that-takes-an-argument
// https://kyounghwan01.github.io/blog/React/redux/redux-toolkit/#createslice
// https://velog.io/@vvvvwvvvv/React-21.-Redux-Saga-createSlicecreateSelector-%EC%A0%81%EC%9A%A9