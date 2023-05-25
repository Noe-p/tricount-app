import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { P1 } from '../../../components';
import {
  getTotalAmount,
  getUsersAmount,
} from '../../../services/api/apiService';
import { COLORS } from '../../../themes';
import { UsersAmount } from '../../../types';

interface BalancePageProps {
  className?: string;
}

export function BalancePage(props: BalancePageProps): JSX.Element {
  const { className } = props;
  const [usersAmount, setUsersAmount] = useState<UsersAmount[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  async function fetchUsersAmount() {
    const usersAmount = await getUsersAmount();
    setUsersAmount(usersAmount);
  }

  async function fetchTotalAmount() {
    const totalAmount = await getTotalAmount();
    setTotalAmount(totalAmount);
  }

  useEffect(() => {
    fetchUsersAmount();
    fetchTotalAmount();
  }, []);

  return (
    <Main className={className}>
      {usersAmount.map((userAmount) => {
        return userAmount.balance > 0 ? (
          <BalanceContainer key={userAmount.user.id}>
            <Col>
              <BalanceLabel $isPositive={true}>
                <P1>{`${userAmount.user.firstName} ${userAmount.user.lastName}`}</P1>
              </BalanceLabel>
            </Col>
            <Col>
              <PositiveBalance
                $width={(userAmount.balance / totalAmount) * 100}
              >
                <AmountLabel $isPositive={true}>{`${userAmount.balance.toFixed(
                  2
                )} €`}</AmountLabel>
              </PositiveBalance>
            </Col>
          </BalanceContainer>
        ) : (
          <BalanceContainer key={userAmount.user.id}>
            <Col $isPositive={true}>
              {userAmount.balance === 0 ? (
                <EmptyBalance>
                  <AmountLabel
                    $isPositive={false}
                  >{`${userAmount.balance.toFixed(2)} €`}</AmountLabel>
                </EmptyBalance>
              ) : (
                <NegativeBalance
                  $width={(-userAmount.balance / totalAmount) * 100}
                >
                  <AmountLabel
                    $isPositive={false}
                  >{`${userAmount.balance.toFixed(2)} €`}</AmountLabel>
                </NegativeBalance>
              )}
            </Col>
            <Col>
              <BalanceLabel $isPositive={false}>
                <P1>{`${userAmount.user.firstName} ${userAmount.user.lastName}`}</P1>
              </BalanceLabel>
            </Col>
          </BalanceContainer>
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
  padding-bottom: 100px;
`;

const BalanceContainer = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid ${COLORS.GREY_300};
`;

const BaseBalance = styled.div<{ $width: number }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${({ $width }) => $width}%;
  height: 100%;
  position: relative;
`;

const Col = styled.div<{ $isPositive?: boolean }>`
  width: 50%;
  padding: 2px 0;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: ${({ $isPositive }) =>
    $isPositive ? 'flex-end' : 'flex-start'};
`;

const PositiveBalance = styled(BaseBalance)`
  background-color: ${COLORS.GREEN_400};
  border-radius: 0 8px 8px 0;
`;

const NegativeBalance = styled(BaseBalance)`
  background-color: ${COLORS.RED_400};
  border-radius: 8px 0 0 8px;
`;

const BalanceLabel = styled.div<{ $isPositive: boolean }>`
  width: 100%;
  display: flex;
  justify-content: ${({ $isPositive }) =>
    $isPositive ? 'flex-end' : 'flex-start'};
  padding: 0 8px;
`;

const AmountLabel = styled(P1)<{ $isPositive: boolean }>`
  color: ${COLORS.GREY_700};
  position: absolute;
  width: 100%;
  min-width: 100px;
  ${({ $isPositive }) => (!$isPositive ? 'right: 0' : 'left: 0')};
  text-align: ${({ $isPositive }) => (!$isPositive ? 'right' : 'left')};
  padding: 0 8px;
`;

const EmptyBalance = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
