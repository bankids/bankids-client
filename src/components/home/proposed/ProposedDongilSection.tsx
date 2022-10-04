import SkeletonDongilList from '@components/common/skeletons/SkeletonDongilList';
import { IKidChallengeListDTO } from '@lib/apis/challenge/challengeDTO';
import { TStatus } from '@lib/types/TStatus';
import styled from 'styled-components';
import EmptyDongil from '../EmptyDongil';
import ProposedDongilList from './ProposedDongilList';

interface ProposedDongilSectionProps {
  proposedDongilsStatus: TStatus;
  proposedDongils: IKidChallengeListDTO | undefined;
}

function ProposedDongilSection({
  proposedDongilsStatus,
  proposedDongils,
}: ProposedDongilSectionProps) {
  let content;
  if (proposedDongilsStatus === 'success') {
    if (proposedDongils?.challengeList.length === 0) {
      content = <EmptyDongil subject="제안받은" />;
    } else {
      content = (
        <ProposedDongilList proposedDongils={proposedDongils?.challengeList!} />
      );
    }
  } else {
    content = <SkeletonDongilList variant="proposed" />;
  }

  return (
    <Wrapper>
      <h1>제안받은 돈길</h1>
      {content}
    </Wrapper>
  );
}

export default ProposedDongilSection;

const Wrapper = styled.section`
  margin-top: 48px;
  h1 {
    width: 100%;
    height: 16px;
    margin-bottom: 24px;
    ${({ theme }) => theme.typo.fixed.HomeSubtitle_T_16_EB};
    ${({ theme }) => theme.palette.greyScale.black};
  }
`;
