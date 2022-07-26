export interface IRoleDependency {
  isKid: boolean | null;
  isFemale: boolean | null;
}

export interface IFamilyState {
  username: string;
  isFemale: boolean;
  isKid: boolean;
}

export type TItemName =
  | '학용품'
  | '생활용품'
  | '전자제품'
  | '식품'
  | '문화생활'
  | '패션뷰티'
  | '선물'
  | '비상금'
  | '기타';
