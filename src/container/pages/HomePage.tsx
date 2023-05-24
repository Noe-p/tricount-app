/* eslint-disable indent */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal } from '../../components';
import {
  getAllExpenses,
  getTotalAmount,
  getUser,
  getUserAmount,
} from '../../services/api/apiService';
import { getCookie } from '../../services/cookies';
import { COLORS } from '../../themes';
import { Expense, ModalChoice, NavChoice, User } from '../../types';
import {
  BalancePage,
  ChooseUserModale,
  ChooseUserPage,
  CreateExpense,
  ExpensePage,
  Footer,
  Header,
  UpdateExpense,
} from '../components';

export function HomePage(): JSX.Element {
  const [expenseId, setExpenseId] = useState<string>();
  const [allExpenses, setAllExpenses] = useState<Expense[]>([]);
  const [modalChoice, setModalChoice] = useState<ModalChoice>(ModalChoice.NULL);
  const [total, setTotal] = useState<number>(0);
  const [userAmount, setUserAmount] = useState<number>(0);
  const [navChoice, setNavChoice] = useState<NavChoice>(NavChoice.EXPENSE);
  const [currentUser, setCurrentUser] = useState<User>();

  async function fetchAllExpenses() {
    const expenses = await getAllExpenses();
    setAllExpenses(expenses);
  }

  async function fetchTotals() {
    const total = await getTotalAmount();
    setTotal(total);
  }

  async function fetchUserAmount() {
    if (!currentUser) return;
    const userAmount = await getUserAmount(currentUser.id);
    setUserAmount(userAmount);
  }

  async function fetchCurrentUser(userId: string) {
    const user = await getUser(userId);
    setCurrentUser(user);
  }

  useEffect(() => {
    const userId = getCookie('userId');
    if (userId) {
      setNavChoice(NavChoice.EXPENSE);
      fetchCurrentUser(userId);
    } else {
      setModalChoice(ModalChoice.USER_CHOICE);
    }
  }, []);

  useEffect(() => {
    fetchAllExpenses();
    fetchTotals();
    fetchUserAmount();
  }, [modalChoice, currentUser]);

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
      case ModalChoice.USER_CHOICE:
        return (
          <ChooseUserModale
            setCurrentUser={setCurrentUser}
            closeModal={() => setModalChoice(ModalChoice.NULL)}
          />
        );
    }
  }

  function renderPage() {
    switch (navChoice) {
      case NavChoice.EXPENSE:
        return (
          <ExpensePage
            setExpenseId={setExpenseId}
            expenses={allExpenses}
            openModal={() => setModalChoice(ModalChoice.UPDATE_EXPENSE)}
          />
        );
      case NavChoice.BALANCE:
        return <BalancePage />;
      case NavChoice.USER:
        return (
          <ChooseUserPage
            setUserSelected={setCurrentUser}
            userSelected={currentUser}
          />
        );
    }
  }

  return (
    <Main>
      <Header navChoice={navChoice} setNavChoice={setNavChoice} />
      <Page>{renderPage()}</Page>
      <Footer
        total={total}
        userAmount={userAmount}
        openModal={() => setModalChoice(ModalChoice.CREATE_EXPENSE)}
      />
      <Modal
        isOpen={modalChoice !== ModalChoice.NULL}
        onRequestClose={() =>
          modalChoice !== ModalChoice.USER_CHOICE &&
          setModalChoice(ModalChoice.NULL)
        }
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
  justify-content: start;
  height: calc(100% - 70px);
  width: 100%;
  overflow-y: scroll;
  background-color: ${COLORS.GREY_50};
  padding-top: 16px;
`;
