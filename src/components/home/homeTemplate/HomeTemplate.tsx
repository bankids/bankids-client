import styled from 'styled-components';
import FixedBar from './FixedBar';
import Background from '@components/home/homeTemplate/Background';
import usePreventGoBack from '@lib/hooks/usePreventGoBack';
import ContentWrapper from './ContentWrapper';

interface HomeTemplateProps {
  children: React.ReactNode;
}

function HomeTemplate({ children }: HomeTemplateProps) {
  usePreventGoBack();

  return (
    <Wrapper>
      <FixedBar />
      <ContentWrapper>{children}</ContentWrapper>
      <Background />
    </Wrapper>
  );
}

export default HomeTemplate;

const Wrapper = styled.div`
  width: 100%;
  position: relative;

  overflow-y: auto;
  overflow-x: hidden;
  height: calc(var(--vh, 1vh) * 100);
`;
