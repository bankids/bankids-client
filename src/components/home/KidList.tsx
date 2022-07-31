import { IKid } from '@store/slices/kidsSlice';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { ReactComponent as UsernameUnderline } from '@assets/borders/username-underline.svg';

interface KidListProps {
  kids: IKid[];
  selectedKid: IKid;
  setSelectedKid: Dispatch<SetStateAction<IKid | null>>;
}

function KidList({ kids, selectedKid, setSelectedKid }: KidListProps) {
  return (
    <Wrapper>
      {kids?.map((kid) => (
        <UsernameButton
          onClick={() => {
            setSelectedKid(kid);
          }}
          key={kid.username}
          className={kid === selectedKid ? 'active' : undefined}
        >
          {kid.username}
          {kid === selectedKid && (
            <div className="username-underline-wrapper">
              <UsernameUnderline />
            </div>
          )}
        </UsernameButton>
      ))}
    </Wrapper>
  );
}

export default KidList;

const Wrapper = styled.div`
  margin-top: 38px;
  width: 250px;
  height: 24px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const UsernameButton = styled.button`
  ${({ theme }) => theme.typo.fixed.HomeSubtitle_T_16_EB};
  color: ${({ theme }) => theme.palette.greyScale.grey100};
  & + & {
    margin-left: 8px;
  }
  &.active {
    transition: 0.125s all ease-in;
    color: ${({ theme }) => theme.palette.greyScale.grey700};
  }
  .username-underline-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 8px;
    height: 2px;
  }
`;

// https://codepen.io/chaoticpotato/pen/vELNrG
