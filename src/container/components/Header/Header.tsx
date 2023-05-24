import { ArrowsRightLeftIcon, BanknotesIcon } from '@heroicons/react/24/solid';
import styled from 'styled-components';
import { P1 } from '../../../components';
import { COLORS } from '../../../themes';
import { NavChoice } from '../../../types';

interface HeaderProps {
  className?: string;
  navChoice: NavChoice;
  setNavChoice: (navChoice: NavChoice) => void;
}

export function Header(props: HeaderProps): JSX.Element {
  const { className, navChoice, setNavChoice } = props;

  return (
    <Main className={className}>
      <Nav
        $selected={navChoice === NavChoice.EXPENSE}
        onClick={() => setNavChoice(NavChoice.EXPENSE)}
      >
        <IconExpense $selected={navChoice === NavChoice.EXPENSE} />
        <Label $selected={navChoice === NavChoice.EXPENSE}>{'Dépenses'}</Label>
      </Nav>
      <Nav
        $selected={navChoice === NavChoice.BALANCE}
        onClick={() => setNavChoice(NavChoice.BALANCE)}
      >
        <BalanceIcon $selected={navChoice === NavChoice.BALANCE} />
        <Label $selected={navChoice === NavChoice.BALANCE}>{'Équilibre'}</Label>
      </Nav>
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  background-color: ${COLORS.PRIMARY_400};
  z-index: 1;
  height: 80px;
`;

const Nav = styled.div<{ $selected: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  cursor: pointer;
  border-bottom: solid 3px;
  border-bottom-color: ${({ $selected }) =>
    $selected ? COLORS.PRIMARY_700 : COLORS.PRIMARY_400};
`;
const Label = styled(P1)<{ $selected?: boolean }>`
  color: ${COLORS.WHITE};
  opacity: ${({ $selected }) => ($selected ? 1 : 0.5)};
  margin: 0;
  text-transform: uppercase;
`;

const IconExpense = styled(BanknotesIcon)<{ $selected?: boolean }>`
  color: ${COLORS.WHITE};
  opacity: ${({ $selected }) => ($selected ? 1 : 0.5)};
  width: 24px;
  height: 24px;
  margin-bottom: 10px;
`;

const BalanceIcon = styled(ArrowsRightLeftIcon)<{ $selected?: boolean }>`
  color: ${COLORS.WHITE};
  opacity: ${({ $selected }) => ($selected ? 1 : 0.5)};
  width: 24px;
  height: 24px;
  margin-bottom: 10px;
`;
