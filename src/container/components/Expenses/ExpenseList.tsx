import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { H3, P1, P2 } from '../../../components';
import { getAllExpenses } from '../../../services/api/apiService';
import { COLORS } from '../../../themes';
import { Expense } from '../../../types';

interface ExpenseListProps {
  className?: string;
}

export function ExpenseList(props: ExpenseListProps): JSX.Element {
  const { className } = props;

  const [allExpenses, setAllExpenses] = useState<Expense[]>([]);

  async function fetchAllExpenses() {
    const expenses = await getAllExpenses();
    setAllExpenses(expenses);
  }

  useEffect(() => {
    fetchAllExpenses();
  }, []);

  return (
    <Main className={className}>
      {allExpenses.map((expense) => {
        return (
          <ExpenseCard key={expense.id}>
            <Left>
              <EpenseTitle>{expense.label}</EpenseTitle>
              <ExpenseAuthor>{`${expense.user.firstName} ${expense.user.lastName}`}</ExpenseAuthor>
            </Left>
            <Right>
              {expense.category && <Tag>{expense.category.label}</Tag>}
              <ExpenseAmount>{`${expense.amount} €`}</ExpenseAmount>
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
  width: 100%;
  height: 100%;
  padding-top: 16px;
  background-color: ${COLORS.GREY_50};
`;

const ExpenseCard = styled.div`
  background-color: ${COLORS.WHITE};
  border-radius: 8px;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: min-content;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
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
  color: ${COLORS.GREY_300};
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
