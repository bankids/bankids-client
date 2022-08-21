import { IDongil } from '@lib/types/IDongil';
import styled from 'styled-components';
import WalkingDongilItem from './WalkingDongilItem';

interface WalkingDongilListProps {
  walkingDongils: IDongil[];
}

function WalkingDongilList({ walkingDongils }: WalkingDongilListProps) {
  return (
    <Wrapper>
      {walkingDongils?.map((walkingDongil) => (
        <WalkingDongilItem
          key={walkingDongil.id}
          itemName={walkingDongil.itemName}
          title={walkingDongil.title}
          id={walkingDongil.id}
          interestRate={walkingDongil.interestRate}
          challengeStatus={walkingDongil.challengeStatus}
        />
      ))}
    </Wrapper>
  );
}

export default WalkingDongilList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
