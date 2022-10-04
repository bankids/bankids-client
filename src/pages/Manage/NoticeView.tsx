import ForegroundTemplate from '@components/layout/ForegroundTemplate';
import useNoticeByIdQuery from '@lib/hooks/queries/useNoticeByIdQuery';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { NoticeItem } from './Notices';

function NoticeView() {
  const { id } = useParams();
  const { data, status } = useNoticeByIdQuery(id!);
  return (
    <ForegroundTemplate>
      <>
        {status === 'success' && (
          <>
            <NoticeItem>
              <p>{data.title}</p>
              <p>{dayjs(data.createdAt).format('YYYY.MM.DD')}</p>
            </NoticeItem>
            <Content>{data.body}</Content>
          </>
        )}
      </>
    </ForegroundTemplate>
  );
}

export default NoticeView;

const Content = styled.div`
  padding: 26px;
  ${({ theme }) => theme.typo.text.S_14_M}
  color: ${({ theme }) => theme.palette.greyScale.black};
  white-space: pre-wrap;
`;
