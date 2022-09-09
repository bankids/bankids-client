import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import { selectAccessToken, setLevel } from '@store/slices/authSlice';
import getLocalStorage from '@lib/utils/localStorage/getLocalStorage';

function PersistLogin() {
  const accessToken = useAppSelector(selectAccessToken);
  // const accessToken = getLocalStorage('accessToken');
  console.log('aT in PersistLogin: ', accessToken);

  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  // @ts-expect-error
  useEffect(() => {
    let isMounted = true;
    async function fetchLevel() {
      try {
        const response = await axiosPrivate.get('/user');
        const { isKid } = response.data.data.user;
        if (isKid) {
          const { level } = response.data.data.kid;
          dispatch(setLevel(level)); // get latest level
        }
      } catch (error) {
        navigate('/auth/login'); // access token expired
      } finally {
        isMounted && setIsLoading(false); // escape memory leak
      }
    }
    console.log('aT in fetchLevel: ', accessToken);
    accessToken && fetchLevel();
    return () => (isMounted = false);
  }, []);

  if (accessToken !== null && isLoading) {
    return <p>자동로그인 처리중입니다...</p>;
  } else {
    return <Outlet />;
  }
}

export default PersistLogin;

// httpOnly secure cookie 사용 시 logic
// const [isLoading, setIsLoading] = useState(true);
// const refreshAccessToken = useRefreshAccessToken();
// const accessToken = useAppSelector(selectAccessToken);
// const [persist] = useLocalStorage('persist', true);

// // @ts-expect-error
// useEffect(() => {
//   let isMounted = true;
//   const verifyRefreshToken = async () => {
//     try {
//       await refreshAccessToken();
//     } catch (err) {
//       console.error(err);
//     } finally {
//       isMounted && setIsLoading(false); // escape memory leak
//     }
//   };

//   // verify only on refresh
//   if (accessToken === '' && persist) {
//     verifyRefreshToken();
//   } else {
//     setIsLoading(false);
//   }

//   return () => (isMounted = false);
// }, []);

// if (persist && isLoading) {
//   return <p>자동 로그인 처리중입니다...</p>;
// } else {
//   return <Outlet />;
// }
