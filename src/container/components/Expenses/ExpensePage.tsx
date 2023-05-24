import styled from 'styled-components';
import { H3, P1, P2 } from '../../../components';
import { COLORS } from '../../../themes';
import { Expense } from '../../../types';

interface ExpensePageProps {
  className?: string;
  expenses: Expense[];
  openModal: () => void;
  setExpenseId: (id: string) => void;
}

export function ExpensePage(props: ExpensePageProps): JSX.Element {
  const { className, expenses, openModal, setExpenseId } = props;

  return (
    <Main className={className}>
      {expenses.map((expense) => {
        return (
          <ExpenseCard
            key={expense.id}
            onClick={() => {
              setExpenseId(expense.id);
              openModal();
            }}
          >
            <Left>
              <EpenseTitle>{expense.label}</EpenseTitle>
              <ExpenseAuthor>
                <span>{'payé par'}</span>
                {` ${expense.user.firstName} ${expense.user.lastName}`}
              </ExpenseAuthor>
            </Left>
            <Right>
              {expense.category.id !== null && (
                <Tag>{expense.category.label}</Tag>
              )}
              <Col>
                <ExpenseAmount>{`${expense.amount} €`}</ExpenseAmount>
                <Date>{expense.date.toLocaleDateString()}</Date>
              </Col>
            </Right>
          </ExpenseCard>
        );
      })}
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 90%;
  height: 100%;
`;

const ExpenseCard = styled.div`
  background-color: ${COLORS.WHITE};
  border-radius: 8px;
  width: 100%;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: min-content;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  margin-bottom: 12px;
  cursor: pointer;
`;

const Left = styled.div``;

const Right = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const EpenseTitle = styled(H3)`
  margin-bottom: 5px;
  color: ${COLORS.GREY_800};
`;

const ExpenseAuthor = styled(P2)`
  color: ${COLORS.GREY_400};

  span {
    color: ${COLORS.GREY_300};
  }
`;

const ExpenseAmount = styled(P1)`
  font-weight: bold;
  color: ${COLORS.PRIMARY_500};
`;

const Tag = styled(P2)`
  padding: 4px 8px;
  border-radius: 8px;
  border: 1px solid ${COLORS.GREY_300};
  margin-right: 15px;
  color: ${COLORS.GREY_300};
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: end;
`;

const Date = styled(P2)`
  color: ${COLORS.GREY_300};
  font-size: 12px;
`;
