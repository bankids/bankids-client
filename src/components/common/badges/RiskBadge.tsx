import { TRiskLevel } from '@lib/types/TRiskLevel';
import styled, { css } from 'styled-components';
import getColorByRiskLevel from './getColorByRiskLevel';

interface RiskBadgeProps {
  /** 위험도를 선택합니다. */
  riskLevel: TRiskLevel;
}

function RiskBadge({ riskLevel }: RiskBadgeProps) {
  const colorByRiskLevel = getColorByRiskLevel(riskLevel);

  return (
    <Wrapper colorByRiskLevel={colorByRiskLevel!}>
      <StyledSpan>{riskLevel}</StyledSpan>
    </Wrapper>
  );
}

export default RiskBadge;

const Wrapper = styled.div<{
  colorByRiskLevel: string;
}>`
  background: ${({ colorByRiskLevel }) => colorByRiskLevel};
  width: 32px;
  height: 15px;
  border-radius: ${({ theme }) => theme.radius.medium};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSpan = styled.span`
  ${({ theme }) => theme.typo.tag.T_8_EB}
  color: ${({ theme }) => theme.palette.greyScale.white};
`;
