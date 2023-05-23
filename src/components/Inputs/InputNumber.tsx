import styled from 'styled-components';
import { COLORS } from '../../themes';
import { P1 } from '../Texts';

interface InputNumberProps extends React.HTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  value?: number;
}

export function InputNumber(props: InputNumberProps): JSX.Element {
  const { className, label, value } = props;

  return (
    <Main className={className}>
      {label && <Label>{label}</Label>}
      <InputStyled
        {...props}
        value={value}
        $placeholder={value === undefined}
        type='number'
      />
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

const Label = styled(P1)``;

const InputStyled = styled.input<{ $placeholder: boolean }>`
  border: 1px solid ${COLORS.GREY_300};
  border-radius: 4px;
  padding: 10px 16px;
  width: 90%;
  color: ${({ $placeholder }) =>
    $placeholder ? COLORS.GREY_400 : COLORS.BLACK};
`;
