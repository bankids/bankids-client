import { darken } from 'polished';
import { useMutation, useQueryClient } from 'react-query';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import LargeSpacer from '@components/atoms/layout/LargeSpacer';
import MarginTemplate from '@components/atoms/layout/MarginTemplate';
import FamilyList from '@components/blocks/mypage/FamilyList';
import KidsRecordList from '@components/blocks/mypage/KidsRecordList';
import MyLevel from '@components/blocks/mypage/MyLevel';
import OverView from '@components/blocks/mypage/OverView';
import { ReactComponent as Setting } from '@assets/icons/setting.svg';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';
import SkeletonOverview from '@components/atoms/skeletons/SkeletonOverView';
import queryKeys from '@lib/constants/queryKeys';
import useUserQuery from '@lib/hooks/queries/useUserQuery';
import useFamilyKidQuery from '@lib/hooks/queries/useFamilyKidQuery';
import familyAPI from '@lib/apis/family/familyAPI';
import useFamilyQuery from '@lib/hooks/queries/useFamilyQuery';

function Mypage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setOpenBottomSheet } = useGlobalBottomSheet();

  const { data: familyData, status: familyStatus } = useFamilyQuery();
  const { data: userData, status: userStatus } = useUserQuery();
  const { data: kidData, status: kidStatus } = useFamilyKidQuery({
    enabled: userData?.user.isKid === false,
  });

  const { mutate: mutateCreateFamily } = useMutation(familyAPI.createFamily, {
    onSuccess: () => {
      openCreateDongilCompletedSheet();
      queryClient.invalidateQueries(queryKeys.FAMILY);
    },
  });

  const openCreateDongilCompletedSheet = () => {
    setOpenBottomSheet({
      sheetContent: 'Completed',
      contentProps: {
        type: 'createGroup',
      },
    });
  };

  const isAllFetched =
    familyStatus === 'success' &&
    userStatus === 'success' &&
    kidStatus !== 'loading';

  return (
    <Wrapper>
      <Header>
        마이페이지
        <Setting onClick={() => navigate('manage')} />
      </Header>
      <MarginTemplate>
        {isAllFetched ? (
          <OverView userData={userData!} />
        ) : (
          <SkeletonOverview isKid={true} />
        )}
        <Section>
          {isAllFetched &&
            (userData?.user.isKid ? (
              <>
                <h2>MY 레벨</h2>
                <MyLevel achievedChallenge={userData.kid!.achievedChallenge} />
              </>
            ) : (
              <>
                <h2>자녀기록</h2>
                <KidsRecordList kidData={kidData!} />
              </>
            ))}
        </Section>
        <Section>
          {isAllFetched && (
            <>
              <h2>가족 관리</h2>
              {familyData!.id ? (
                <FamilyList family={familyData!.familyUserList} />
              ) : (
                <CreateDongil onClick={() => mutateCreateFamily()}>
                  <p>가족그룹 만들기</p>
                  <p>그룹을 만들고 가족을 초대해봐요</p>
                </CreateDongil>
              )}
            </>
          )}
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
  height: calc(var(--vh, 1vh) * 100);
  background-color: ${({ theme }) => theme.palette.greyScale.grey100};
`;

const Header = styled.div`
  ${({ theme }) => theme.typo.fixed.TabName_T_21_EB}
  color: ${({ theme }) => theme.palette.greyScale.black};
  height: 48px;
  padding: 0px 6px 0px 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.greyScale.grey100};
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 3;
  justify-content: space-between;
  svg {
    cursor: pointer;
  }
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

const CreateDongil = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.palette.greyScale.white};
  padding: 16px;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radius.small};
  &:active {
    background-color: ${darken(0.02, '#fff')};
  }
  & > p:first-child {
    ${({ theme }) => theme.typo.text.T_18_EB}
    color: ${({ theme }) => theme.palette.greyScale.black};
    margin-bottom: 8px;
  }
  & > p:last-child {
    ${({ theme }) => theme.typo.text.T_12_EB}
    color: ${({ theme }) => theme.palette.greyScale.grey500};
  }
`;