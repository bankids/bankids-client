import { ReactComponent as Level1 } from '@assets/illusts/homeBackground/Home_Background-1.svg';
import { ReactComponent as Level2 } from '@assets/illusts/homeBackground/Home_Background-2.svg';
import { ReactComponent as Level3 } from '@assets/illusts/homeBackground/Home_Background-3.svg';
import { ReactComponent as Level4 } from '@assets/illusts/homeBackground/Home_Background-4.svg';
import { ReactComponent as Level5 } from '@assets/illusts/homeBackground/Home_Background-5.svg';
import { ReactComponent as LevelMinus4 } from '@assets/illusts/homeBackground/Home_Background-4-5.svg';
import { TLevel } from '@lib/types/TLevel';

function renderHomeBackground(level: TLevel) {
  if (level === 1) {
    return <Level1 />;
  } else if (level === 2) {
    return <Level2 />;
  } else if (level === 3) {
    return <Level3 />;
  } else if (level === 4) {
    return <Level4 />;
  } else if (level === -4 || level === 0) {
    // TODO: 백 수정 이후 level: 0인 경우 삭제
    return <LevelMinus4 />;
  } else if (level === 5) {
    return <Level5 />;
  }
}

export default renderHomeBackground;