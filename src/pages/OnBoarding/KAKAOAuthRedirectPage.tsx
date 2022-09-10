import { useAppDispatch } from '@store/app/hooks';
import { login } from '@store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CustomSyncLoader from '@components/common/CustomSyncLoader';
import setLocalStorage from '@lib/utils/localStorage/setLocalStorage';
import loadEXPOToken from '@lib/utils/loadEXPOToken';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import registerEXPOToken from '@lib/utils/registerEXPOToken';
import { axiosPrivateTemp } from '@apis/axios';
import getLocalStorage from '@lib/utils/localStorage/getLocalStorage';

function KAKAOAuthRedirectPage() {
  // @ts-expect-error
  const params = new URL(document.location).searchParams;
  const code = params.get('code');
  const [EXPOToken, setEXPOToken] = useState<string>('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function proceedLogin() {
      try {
        if (code) {
          const response = await dispatch(login({ code })).unwrap();
          setLocalStorage('accessToken', response.data.accessToken);
          setLocalStorage('isKid', response.data.isKid);
          setLocalStorage('provider', response.data.provider);
        }
        // loadEXPOToken(setEXPOToken);

        console.log('aT just before patch', getLocalStorage('accessToken'));
        const response = await axiosPrivateTemp.patch('/user/expo', {
          expoToken: 'test',
        });
        console.log('response: ', response);

        registerEXPOToken();
        // navigate('/');
        // setTimeout(() => {
        //   navigate('/');
        // }, 5000); // dismiss register EXPOToken
      } catch (error: any) {
        console.error(error);
      }
    }
    code && proceedLogin();
  }, []);

  // const axiosPrivate = useAxiosPrivate();
  // useEffect(() => {
  //   async function registerEXPOToken() {
  //     // alert(
  //     //   `EXPOToken의 변화를 감지했습니다. 변화된 토큰값은 다음과 같습니다. ${EXPOToken}`,
  //     // );
  //     try {
  //       const response = await axiosPrivate.patch('/user/expo', {
  //         expoToken: EXPOToken,
  //       });
  //       // alert(`/user/expo response: ${JSON.stringify(response)}`);
  //       navigate('/');
  //     } catch (error: any) {
  //       alert(`error: ${JSON.stringify(error)}`);
  //     }
  //   }
  //   EXPOToken !== '' && registerEXPOToken();
  // }, [EXPOToken]);

  return <CustomSyncLoader />;
}

export default KAKAOAuthRedirectPage;

// https://velog.io/@he0_077/useEffect-%ED%9B%85%EC%97%90%EC%84%9C-async-await-%ED%95%A8%EC%88%98-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
