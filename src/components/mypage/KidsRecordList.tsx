import { IKidListDTO } from '@lib/api/family/family.type';
import styled from 'styled-components';
import KidsRecordItem from './KidsRecordItem';

function KidsRecordList({ kidData }: { kidData: IKidListDTO[] }) {
  return (
    <Wrapper>
      {kidData.map((kid) => (
        <KidsRecordItem kid={kid} key={kid.username} />
      ))}
    </Wrapper>
  );
}

export default KidsRecordList;

const Wrapper = styled.div`
  & > div:not(:last-child) {
    margin-bottom: 16px;
  }
`;
