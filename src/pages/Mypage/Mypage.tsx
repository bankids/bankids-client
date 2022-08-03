import LargeSpacer from '@components/layout/LargeSpacer';
import MarginTemplate from '@components/layout/MarginTemplate';
import SmallSpacer from '@components/layout/SmallSpacer';
import FamilyList from '@components/mypage/FamilyList';
import KidsRecordList from '@components/mypage/KidsRecordList';
import MyLevel from '@components/mypage/MyLevel';
import OverView from '@components/mypage/OverView';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import { selectIsKid } from '@store/slices/authSlice';
import {
  fetchKids,
  fetchFamily,
  selectFamilyStatus,
  selectFamily,
} from '@store/slices/familySlice';
import {
  fetchKidOverView,
  selectKidOverView,
  selectKidOverViewStatus,
} from '@store/slices/kidOverViewSlice';
import { selectKids } from '@store/slices/kidsSlice';
import { useEffect } from 'react';
import styled, { css } from 'styled-components';

const DemoKidsRecordData = [
  {
    username: '주어진사랑',
    acceptRate: 80,
    acceptRequest: 5,
    achieveRate: 90,
  },
  {
    username: '김수빈',
    acceptRate: 70,
    acceptRequest: 22,
    achieveRate: 80,
  },
];

function Mypage() {
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  const isKid = useAppSelector(selectIsKid)!;
  const familyStatus = useAppSelector(selectFamilyStatus);
  const family = useAppSelector(selectFamily);
  const kidOverView = isKid ? useAppSelector(selectKidOverView) : null;
  // const kids = isKid ? useAppSelector(selectKids) : null;
  useEffect(() => {
    const fetch = async () => {
      try {
        await dispatch(fetchKidOverView({ axiosPrivate })).unwrap();
        if (familyStatus === 'idle')
          await dispatch(fetchFamily({ axiosPrivate })).unwrap();
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);

  return (
    <Wrapper>
      <Header>마이페이지</Header>
      <MarginTemplate>
        <OverView isKid={isKid} kidOverView={kidOverView} />
        {isKid && kidOverView ? (
          <Section>
            <h2>MY 레벨</h2>
            <MyLevel achievedChallenge={kidOverView.achievedChallenge} />
          </Section>
        ) : (
          <Section smallGap={true}>
            <h2>자녀기록</h2>
            {/* {kids.map((kids) => (
              <></>
            ))} */}
            <KidsRecordList kidsRecordData={DemoKidsRecordData} />
          </Section>
        )}
        <Section>
          <h2>가족 관리</h2>
          {family ? <FamilyList family={family} /> : 'null'}
        </Section>
      </MarginTemplate>
      <LargeSpacer />
    </Wrapper>
  );
}

export default Mypage;

const Wrapper = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;
`;

const Header = styled.div`
  ${({ theme }) => theme.typo.fixed.TabName_T_21_EB}
  color: ${({ theme }) => theme.palette.greyScale.black};
  height: 48px;
  padding: 0px 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.greyScale.grey100};
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 5;
`;

const Section = styled.div<{ smallGap?: boolean }>`
  margin-top: 80px;
  ${({ smallGap }) =>
    smallGap &&
    css`
      margin-top: 48px;
    `}
  & > h2 {
    ${({ theme }) => theme.typo.text.T_16_EB}
    color: ${({ theme }) => theme.palette.greyScale.black};
    margin-bottom: 24px;
  }
`;
