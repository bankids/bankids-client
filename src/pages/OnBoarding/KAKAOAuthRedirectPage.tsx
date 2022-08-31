import { useEffect } from 'react';
import { useAppDispatch } from '@store/app/hooks';
import { login } from '@store/slices/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';

function KAKAOAuthRedirectPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const location = useLocation();

  // const href = window.location.href;
  // @ts-expect-error
  const params = new URL(document.location).searchParams;
  const code = params.get('code');

  useEffect(() => {
    async function dispatchLogin() {
      try {
        code && (await dispatch(login({ code })).unwrap());
        navigate('/');
      } catch (error: any) {
        console.error(error);
      }
    }
    dispatchLogin();
  }, []);

  return <p>카카오 로그인 처리중입니다...</p>;
}

export default KAKAOAuthRedirectPage;

// https://velog.io/@he0_077/useEffect-%ED%9B%85%EC%97%90%EC%84%9C-async-await-%ED%95%A8%EC%88%98-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
