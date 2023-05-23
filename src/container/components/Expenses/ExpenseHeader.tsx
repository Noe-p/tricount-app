import styled from 'styled-components';
import { P1 } from '../../../components';
import { COLORS } from '../../../themes';

interface ExpenseHeaderProps {
  closeModal: () => void;
  className?: string;
  isValid?: boolean;
  onValidate: () => void;
  title: string;
}

export function ExpenseHeader(props: ExpenseHeaderProps): JSX.Element {
  const { closeModal, className, isValid = false, onValidate, title } = props;

  return (
    <Header className={className}>
      <ContentHeader>
        <HeaderButton onClick={closeModal} $isActive={true}>
          {'Annuler'}
        </HeaderButton>
        <HeaderTitle>{title}</HeaderTitle>
        <HeaderButton
          onClick={() => isValid && onValidate()}
          $isActive={isValid}
        >
          {'Valider'}
        </HeaderButton>
      </ContentHeader>
    </Header>
  );
}

const Header = styled.div`
  background-color: ${COLORS.PRIMARY_400};
  padding: 20px 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
`;

const ContentHeader = styled.div`
  width: 95%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const HeaderButton = styled(P1)<{ $isActive: boolean }>`
  color: ${({ $isActive }) => ($isActive ? COLORS.WHITE : COLORS.PRIMARY_100)};
  cursor: ${({ $isActive }) => ($isActive ? 'pointer' : 'default')};
`;

const HeaderTitle = styled(P1)`
  color: ${COLORS.WHITE};
`;
