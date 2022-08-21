import Button from '@components/common/buttons/Button';
import CheckButton from '@components/common/buttons/CheckButton';
import { Dispatch, SetStateAction } from 'react';
import styled, { css } from 'styled-components';

type TVariant = 'contract' | 'proposing' | 'rejected' | 'proposed';

function getSubmitButton(
  variant: TVariant,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  handleSubmit: () => void,
  handleExtraSubmit: () => void,
) {
  return (
    <>
      {variant !== 'proposed' && (
        // <ButtonOverlay onClick={() => setIsOpen(false)} />
        <ButtonOverlay />
      )}

      <ButtonWrapper variant={variant}>
        {(variant === 'contract' || variant === 'proposing') && (
          <CheckButton onClick={handleSubmit} />
        )}
        {variant === 'rejected' && (
          <Button
            onClick={handleSubmit}
            property="default"
            label="삭제하기"
            fixed
          />
        )}
      </ButtonWrapper>

      {variant === 'proposed' && (
        <DoubleButtonWrapper>
          <Button property="delete" label="거절하기" onClick={handleSubmit} />
          <Button
            property="default"
            label="수락하기"
            onClick={handleExtraSubmit}
          />
        </DoubleButtonWrapper>
      )}
    </>
  );
}

export default getSubmitButton;

const ButtonOverlay = styled.button`
  width: 100%;
  height: 64px;
  cursor: default;
`;

const ButtonWrapper = styled.div<{ variant: string }>`
  /* ButtonOverlay 하단에 접하도록 임의로 조절함 */
  ${({ variant }) =>
    variant === 'contract' &&
    css`
      margin-top: 487px;
    `}
  ${({ variant }) =>
    variant === 'proposing' &&
    css`
      margin-top: 515px;
    `}
  ${({ variant }) =>
    variant === 'rejected' &&
    css`
      margin-top: 597px;
    `}
  position: absolute;
  z-index: 701;
  display: flex;
  justify-content: center;
`;

const DoubleButtonWrapper = styled.div`
  margin-top: 16px; // arbitrary
  width: 100%;
  height: 48px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 16px;
`;