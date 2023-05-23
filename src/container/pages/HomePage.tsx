/* eslint-disable indent */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal } from '../../components';
import {
  getAllExpenses,
  getTotalAmount,
  getUserAmount,
} from '../../services/api/apiService';
import { Expense } from '../../types';
import {
  CreateExpense,
  ExpenseList,
  Footer,
  UpdateExpense,
} from '../components';

export enum ModalChoice {
  CREATE_EXPENSE = 'CREATE_EXPENSE',
  UPDATE_EXPENSE = 'UPDATE_EXPENSE',
  NULL = 'NULL',
}

export function HomePage(): JSX.Element {
  const [expenseId, setExpenseId] = useState<string>();
  const [allExpenses, setAllExpenses] = useState<Expense[]>([]);
  const [modalChoice, setModalChoice] = useState<ModalChoice>(ModalChoice.NULL);
  const [total, setTotal] = useState<number>(0);
  const [userAmount, setUserAmount] = useState<number>(0);

  async function fetchAllExpenses() {
    const expenses = await getAllExpenses();
    setAllExpenses(expenses);
  }

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
    fetchAllExpenses();
    fetchTotals();
    fetchUserAmount();
  }, [modalChoice]);

  function renderModal() {
    switch (modalChoice) {
      case ModalChoice.CREATE_EXPENSE:
        return (
          <CreateExpense closeModal={() => setModalChoice(ModalChoice.NULL)} />
        );
      case ModalChoice.UPDATE_EXPENSE:
        return (
          <UpdateExpense
            expense={allExpenses.find((e) => e.id === expenseId)}
            closeModal={() => setModalChoice(ModalChoice.NULL)}
          />
        );
    }
  }

  return (
    <Main>
      <Page>
        <ExpenseList
          setExpenseId={setExpenseId}
          expenses={allExpenses}
          openModal={() => setModalChoice(ModalChoice.UPDATE_EXPENSE)}
        />
      </Page>
      <Footer
        total={total}
        userAmount={userAmount}
        openModal={() => setModalChoice(ModalChoice.CREATE_EXPENSE)}
      />
      <Modal
        isOpen={modalChoice !== ModalChoice.NULL}
        onRequestClose={() => setModalChoice(ModalChoice.NULL)}
      >
        {renderModal()}
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
