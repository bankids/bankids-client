import { useAppSelector } from '@store/app/hooks';
import {
  selectPendingDongils,
  selectPendingDongilsStatus,
} from '@store/slices/pendingDongilsSlice';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import EmptyDongil from '../EmptyDongil';
import SkeletonDongilList from '../SkeletonDongilList';
import PendingDongilList from './PendingDongilList';

interface PendingDongilsProps {
  onDeleteCheckOpen: () => void;
  setIdToDelete: Dispatch<SetStateAction<number | null>>;
}

function PendingDongils({
  onDeleteCheckOpen,
  setIdToDelete,
}: PendingDongilsProps) {
  const pendingDongilsStatus = useAppSelector(selectPendingDongilsStatus);
  const pendingDongils = useAppSelector(selectPendingDongils);

  let content: JSX.Element = <></>;
  if (pendingDongilsStatus === 'loading') {
    content = (
      <>
        <h1>대기중인 돈길</h1>
        <SkeletonDongilList variant="pending" />
      </>
    );
  } else if (pendingDongilsStatus === 'succeeded') {
    if (pendingDongils?.length === 0) {
      content = (
        <>
          <h1>대기중인 돈길</h1>
          <EmptyDongil variant="pending" />
        </>
      );
    } else {
      content = (
        <>
          <h1>대기중인 돈길</h1>
          <PendingDongilList
            pendingDongils={pendingDongils!}
            onDeleteCheckOpen={onDeleteCheckOpen}
            setIdToDelete={setIdToDelete}
          />
        </>
      );
    }
  } else if (pendingDongilsStatus === 'failed') {
    content = <p>Failed</p>;
  }
  return <Wrapper>{content}</Wrapper>;
}

export default PendingDongils;

const Wrapper = styled.div`
  margin-top: 48px;
  h1 {
    width: 100%;
    height: 16px;
    margin-bottom: 24px;
    ${({ theme }) => theme.typo.fixed.HomeSubtitle_T_16_EB};
    ${({ theme }) => theme.palette.greyScale.black};
  }
`;