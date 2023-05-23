import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field';
import styled from 'styled-components';
import { COLORS } from '../../themes';

interface InputCurrencyProps extends CurrencyInputProps {}

export function InputCurrency(props: InputCurrencyProps): JSX.Element {
  const { value } = props;

  return (
    <InputStyled
      {...props}
      value={value}
      decimalsLimit={2}
      $placeholder={value === ''}
      prefix='€'
    />
  );
}

const InputStyled = styled(CurrencyInput)<{ $placeholder: boolean }>`
  border: 1px solid ${COLORS.GREY_300};
  border-radius: 4px;
  padding: 10px 12px;
  width: 90%;
  color: ${({ $placeholder }) =>
    $placeholder ? COLORS.GREY_400 : COLORS.BLACK};
  font-size: 16px;
  font-weight: 500;
  width: 93%;
`;
