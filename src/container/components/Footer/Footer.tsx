import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { P1, P2 } from '../../../components/Texts';
import {
  getTotalAmount,
  getUserAmount,
} from '../../../services/api/apiService';
import { COLORS } from '../../../themes';

interface FooterProps {
  className?: string;
  openModal: () => void;
}

export function Footer(props: FooterProps): JSX.Element {
  const { className, openModal } = props;
  const [total, setTotal] = useState<number>(0);
  const [userAmount, setUserAmount] = useState<number>(0);

  async function fetchTotals() {
    const total = await getTotalAmount();
    setTotal(total);
  }

  async function fetchUserAmount() {
    const userAmount = await getUserAmount(
      'e4330cd9-119c-4770-b8ff-861ed001ea4d'
    );
    setUserAmount(userAmount);
  }

  useEffect(() => {
    fetchTotals();
    fetchUserAmount();
  }, []);

  return (
    <Main className={className}>
      <Left>
        <Label>{'Mon coût total'}</Label>
        <Amount>{`${userAmount?.toFixed(2)} €`}</Amount>
      </Left>
      <PlusCircleIconStyled onClick={openModal} />
      <Right>
        <Label>{'Total Dépenses'}</Label>
        <Amount>{`${total?.toFixed(2)} €`}</Amount>
      </Right>
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  width: 100%;
  background-color: ${COLORS.GREY_800};
`;

const PlusCircleIconStyled = styled(PlusCircleIcon)`
  width: 90px;
  height: 90px;
  transform: translateY(-28px);
  color: ${COLORS.PRIMARY_500};
  cursor: pointer;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding: 0 20px;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  padding: 0 20px;
`;

const Label = styled(P2)`
  text-transform: uppercase;
  color: ${COLORS.GREY_300};
  font-size: 12px;
`;

const Amount = styled(P1)`
  color: ${COLORS.WHITE};
`;
