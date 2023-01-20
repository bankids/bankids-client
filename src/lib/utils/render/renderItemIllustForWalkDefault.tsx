import { ReactComponent as A1 } from '@assets/illusts/contractItemNames/walk/a1.svg';
import { ReactComponent as A2 } from '@assets/illusts/contractItemNames/walk/a2.svg';
import { ReactComponent as A3 } from '@assets/illusts/contractItemNames/walk/a3.svg';
import { ReactComponent as B1 } from '@assets/illusts/contractItemNames/walk/b1.svg';
import { ReactComponent as B2 } from '@assets/illusts/contractItemNames/walk/b2.svg';
import { ReactComponent as B3 } from '@assets/illusts/contractItemNames/walk/b3.svg';
import { ReactComponent as C1 } from '@assets/illusts/contractItemNames/walk/c1.svg';
import { ReactComponent as C2 } from '@assets/illusts/contractItemNames/walk/c2.svg';
import { ReactComponent as C3 } from '@assets/illusts/contractItemNames/walk/c3.svg';
import { TItemName } from '@lib/types/TItemName';

function renderItemIllustForWalkDefault(itemName: TItemName) {
  const map = new Map<TItemName, React.ReactElement>();
  map.set('학용품', <A1 />);
  map.set('생활용품', <A2 />);
  map.set('전자제품', <A3 />);
  map.set('식품', <B1 />);
  map.set('문화생활', <B2 />);
  map.set('패션뷰티', <B3 />);
  map.set('선물', <C1 />);
  map.set('비상금', <C2 />);
  map.set('기타', <C3 />);
  return map.get(itemName);
}

export default renderItemIllustForWalkDefault;