import { ReactComponent as A1 } from '@assets/illusts/contractItemNames/create/a1.svg';
import { ReactComponent as A2 } from '@assets/illusts/contractItemNames/create/a2.svg';
import { ReactComponent as A3 } from '@assets/illusts/contractItemNames/create/a3.svg';
import { ReactComponent as B1 } from '@assets/illusts/contractItemNames/create/b1.svg';
import { ReactComponent as B2 } from '@assets/illusts/contractItemNames/create/b2.svg';
import { ReactComponent as B3 } from '@assets/illusts/contractItemNames/create/b3.svg';
import { ReactComponent as C1 } from '@assets/illusts/contractItemNames/create/c1.svg';
import { ReactComponent as C2 } from '@assets/illusts/contractItemNames/create/c2.svg';
import { ReactComponent as C3 } from '@assets/illusts/contractItemNames/create/c3.svg';
import { TItemName } from '@lib/types/TItemName';

function renderItemIllustForCreate(itemName: TItemName) {
  if (itemName === '학용품') {
    return <A1 />;
  } else if (itemName === '생활용품') {
    return <A2 />;
  } else if (itemName === '전자제품') {
    return <A3 />;
  } else if (itemName === '식품') {
    return <B1 />;
  } else if (itemName === '문화생활') {
    return <B2 />;
  } else if (itemName === '패션뷰티') {
    return <B3 />;
  } else if (itemName === '선물') {
    return <C1 />;
  } else if (itemName === '비상금') {
    return <C2 />;
  } else if (itemName === '기타') {
    return <C3 />;
  }
}

export default renderItemIllustForCreate;
