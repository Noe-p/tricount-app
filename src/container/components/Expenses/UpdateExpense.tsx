import { XMarkIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { Input, InputCurrency, P1 } from '../../../components';
import {
  createCategory,
  getAllCategories,
  getAllUsers,
  removeCategory,
  removeExpense,
  updateExpense,
} from '../../../services/api/apiService';
import { COLORS } from '../../../themes';
import { Category, Expense, ExpenseDto, User } from '../../../types';
import { ExpenseHeader } from './ExpenseHeader';

interface UpdateExpenseProps {
  className?: string;
  closeModal: () => void;
  expense?: Expense;
}

interface Option {
  id: string;
  value: string;
  label: string;
}

export function UpdateExpense(props: UpdateExpenseProps): JSX.Element {
  const { className, closeModal, expense } = props;
  const [title, setTitle] = useState(expense?.label ?? '');
  const [allUser, setAllUser] = useState<User[]>([]);
  const [allCategory, setAllCategory] = useState<Category[]>([]);
  const [authorSelected, setAuthorSelected] = useState<Option | null>({
    id: expense?.user.id ?? '',
    label: `${expense?.user.firstName} ${expense?.user.lastName}`,
    value: expense?.user.id ?? '',
  });
  const [amount, setAmount] = useState<string | undefined>(
    expense?.amount.toString() ?? ''
  );
  const [category, setCategory] = useState<string | undefined | null>(
    expense?.category?.id ?? undefined
  );
  const [isValid, setIsValid] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [participantsSelected, setParticipantsSelected] = useState<Option[]>(
    expense?.participants.map((p) => ({
      id: p.id,
      label: `${p.firstName} ${p.lastName}`,
      value: p.id,
    })) ?? []
  );

  async function onValidate() {
    if (!expense) return;
    const formatExpense: ExpenseDto = {
      label: title,
      amount: Number(amount) ?? 0,
      id_user: authorSelected?.id ?? '',
      id_category: category ?? null,
      date: new Date(),
      participants: participantsSelected.map((p) => p.id),
    };
    await updateExpense(expense.id, formatExpense);
    closeModal();
    initializeState();
  }

  function initializeState() {
    setTitle('');
    setAuthorSelected(null);
    setAmount(undefined);
    setCategory(undefined);
    setNewCategory('');
    setIsValid(false);
    setParticipantsSelected([]);
  }

  async function fetchUsers() {
    const users = await getAllUsers();
    setAllUser(users);
  }

  async function fetchCategories() {
    const categories = await getAllCategories();
    setAllCategory(categories);
  }

  async function createNewCategory() {
    if (
      newCategory === '' ||
      allCategory.find((cat) => cat.label === newCategory)
    )
      return;
    await createCategory({ label: newCategory });
    fetchCategories();
    setNewCategory('');
  }

  async function suppCategory(id: string) {
    await removeCategory(id);
    fetchCategories();
    setNewCategory('');
  }

  async function deleteExpense() {
    if (!expense) return;
    await removeExpense(expense.id);
    closeModal();
    initializeState();
  }

  useEffect(() => {
    fetchUsers();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (
      title !== '' &&
      authorSelected !== null &&
      !isNaN(Number(amount)) &&
      amount !== '' &&
      participantsSelected.length > 0
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [title, authorSelected, amount, participantsSelected]);

  return (
    <Main className={className}>
      <ExpenseHeader
        title=''
        closeModal={() => {
          initializeState();
          closeModal();
        }}
        isValid={isValid}
        onValidate={onValidate}
      />
      <Form>
        <InputPosition>
          <Input
            placeholder='Titre'
            value={title}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setTitle(e.currentTarget.value)
            }
          />
        </InputPosition>
        <InputPosition>
          <Select
            placeholder='Créer par'
            options={allUser.map((user) => ({
              id: user.id,
              label: `${user.firstName} ${user.lastName}`,
              value: user.id,
            }))}
            value={authorSelected}
            onChange={setAuthorSelected}
          />
        </InputPosition>
        <InputPosition>
          <InputCurrency
            placeholder='Montant'
            value={amount}
            onValueChange={(value) => setAmount(value)}
          />
        </InputPosition>
        <InputPosition>
          <Select
            placeholder='Participants'
            options={allUser.map((user) => ({
              id: user.id,
              label: `${user.firstName} ${user.lastName}`,
              value: user.id,
            }))}
            isMulti
            value={participantsSelected}
            onChange={(value) => setParticipantsSelected([...value])}
          />
        </InputPosition>
        <TagPosition>
          <Row>
            <Input
              value={newCategory}
              onChange={(e) => setNewCategory(e.currentTarget.value)}
              placeholder='Ajouter une catégorie'
            />
            <AddTag
              onClick={() => {
                createNewCategory();
              }}
            >
              {'Ajouter'}
            </AddTag>
          </Row>
          <TagContainer>
            {allCategory?.map((cat) => (
              <Tag
                onClick={(e) => {
                  e.stopPropagation();
                  setCategory(category === cat.id ? undefined : cat.id);
                }}
                $isSelected={category === cat.id}
                key={cat.id}
              >
                {cat.label}
                <XMarkIconStyled
                  onClick={(e) => {
                    e.stopPropagation();
                    suppCategory(cat.id ?? '');
                  }}
                  $isSelected={category === cat.id}
                />
              </Tag>
            ))}
          </TagContainer>
        </TagPosition>
      </Form>
      <RemoveButton onClick={deleteExpense}>{'Supprimer'}</RemoveButton>
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Form = styled.form`
  /* display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 10px; */
  margin-top: 20px;
  width: 95%;
`;

const TagPosition = styled.div`
  margin-top: 40px;
  width: 100%;
`;

const InputPosition = styled.div`
  margin-top: 20px;
`;

const TagContainer = styled.div`
  display: flex;
  align-items: start;
  justify-content: start;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 10px;
`;

const Tag = styled(P1)<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: ${({ $isSelected }) =>
    $isSelected ? COLORS.PRIMARY_200 : COLORS.GREY_100};
  border: 1px solid ${COLORS.GREY_300};
  border-color: ${({ $isSelected }) =>
    $isSelected ? COLORS.PRIMARY_700 : COLORS.GREY_400};
  color: ${({ $isSelected }) =>
    $isSelected ? COLORS.GREY_600 : COLORS.GREY_400};
  cursor: pointer;
  margin-right: 5px;
  margin-bottom: 5px;

  &:first-child {
    margin-left: 0px;
  }
`;

const AddTag = styled(P1)`
  padding: 5px 10px;
  border-radius: 4px;
  background-color: ${COLORS.PRIMARY_500};
  border: 1px solid ${COLORS.PRIMARY_700};
  color: ${COLORS.GREY_200};
  cursor: pointer;
  margin-left: 5px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const XMarkIconStyled = styled(XMarkIcon)<{ $isSelected: boolean }>`
  width: 20px;
  height: 20px;
  margin-left: 5px;
  color: ${({ $isSelected }) =>
    $isSelected ? COLORS.PRIMARY_700 : COLORS.GREY_400};
`;

const RemoveButton = styled(P1)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: ${COLORS.RED_500};
  border: 1px solid ${COLORS.RED_700};
  color: ${COLORS.WHITE};
  cursor: pointer;
  width: 70%;
  margin-top: 50px;
`;
