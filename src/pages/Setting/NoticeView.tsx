import ForegroundTemplate from '@components/layout/ForegroundTemplate';
import useNoticeApi from '@lib/api/notice/useNoticeApi';
import { NOTICE } from '@lib/constants/QUERY_KEY';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { NoticeItem } from './Notices';

const NoticeView = () => {
  const { id } = useParams();
  const { getNotice } = useNoticeApi();
  const { data, status } = useQuery([NOTICE, id], () => getNotice(id!));
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
};

export default NoticeView;

const Content = styled.div`
  padding: 26px;
  ${({ theme }) => theme.typo.text.S_14_M}
  color: ${({ theme }) => theme.palette.greyScale.black};
  white-space: pre-wrap;
`;