import styled from 'styled-components';

function LargeSpacer({ isWhite = false }: { isWhite?: boolean }) {
  return <StyledDiv isWhite={isWhite} />;
}

export default LargeSpacer;

// TabBar height: 47px;
// TabBar 있는 경우 LargeSpacer(height: 96), TabBar 없는 경우 SmallSpacer(height: 48) 사용
const StyledDiv = styled.div<{ isWhite: boolean }>`
  // TODO: change to 96px
  height: 300px;
  /* height: 96px; */
  width: 100%;
  background: palegreen;
  /* background: ${({ theme, isWhite }) =>
    isWhite
      ? theme.palette.greyScale.white
      : theme.palette.greyScale.grey100}; */
`;
