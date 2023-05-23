import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal } from '../../components';
import { getAllExpenses } from '../../services/api/apiService';
import { Expense } from '../../types';
import { CreateExpense, ExpenseList, Footer } from '../components';

export function HomePage(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allExpenses, setAllExpenses] = useState<Expense[]>([]);

  async function fetchAllExpenses() {
    const expenses = await getAllExpenses();
    setAllExpenses(expenses);
  }

  useEffect(() => {
    fetchAllExpenses();
  }, [isModalOpen]);

  return (
    <Main>
      <Page>
        <ExpenseList expenses={allExpenses} />
      </Page>
      <Footer openModal={() => setIsModalOpen(true)} />
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <CreateExpense closeModal={() => setIsModalOpen(false)} />
      </Modal>
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 50vw;
  justify-content: center;
  align-items: center;
  transform: translateX(50%);

  @media (max-width: 768px) {
    width: 100vw;
    transform: translateX(0);
  }
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 70px);
  width: 100%;
  overflow-y: scroll;
`;
