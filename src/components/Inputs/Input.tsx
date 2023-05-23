import styled from 'styled-components';
import { COLORS } from '../../themes';

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  value?: string;
}

export function Input(props: InputProps): JSX.Element {
  const { value } = props;

  return <InputStyled {...props} value={value} $placeholder={value === ''} />;
}

const InputStyled = styled.input<{ $placeholder: boolean }>`
  border: 1px solid ${COLORS.GREY_300};
  border-radius: 4px;
  padding: 10px 12px;
  width: 90%;
  color: ${({ $placeholder }) =>
    $placeholder ? COLORS.GREY_400 : COLORS.BLACK};
  font-size: 16px;
  font-weight: 500;
  width: 93%;
  height: 20px;
`;
