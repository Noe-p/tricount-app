import {
  CheckIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { H1, Modal, P1 } from '../../../components';
import { getAllUsers, removeUser } from '../../../services/api/apiService';
import { setCookie } from '../../../services/cookies';
import { COLORS } from '../../../themes';
import { User } from '../../../types';
import { CreateUser } from './CreateUser';

interface ChooseUserModaleProps {
  className?: string;
  setCurrentUser: (user: User) => void;
  closeModal: () => void;
}

export function ChooseUserModale(props: ChooseUserModaleProps): JSX.Element {
  const { className, setCurrentUser, closeModal } = props;
  const [users, setUsers] = useState<User[]>();
  const [userSelected, setUserSelected] = useState<User>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateUser, setUpdateUser] = useState<User>();

  async function fetchUsers() {
    const users = await getAllUsers();
    setUsers(users);
  }

  useEffect(() => {
    fetchUsers();
  }, [updateUser]);

  function handleUserClick(user: User) {
    setUserSelected(user);
  }

  function onSubmit() {
    if (userSelected) {
      setCurrentUser(userSelected);
      setCookie('userId', userSelected.id);
      closeModal();
    }
  }

  async function deleteUser(userId: string) {
    await removeUser(userId);
    fetchUsers();
  }

  function onUpdateUser(user: User) {
    setUpdateUser(user);
    setIsModalOpen(true);
  }

  return (
    <Main className={className}>
      <Title>{'Tricount App'}</Title>
      <UserList>
        {users?.map((user) => (
          <UserItem key={user.id} onClick={() => handleUserClick(user)}>
            <IconContainer>
              {userSelected?.id === user.id && <CheckIconStyled />}
            </IconContainer>
            <UserName>{`${user.firstName} ${user.lastName}`}</UserName>
            <ButtonsContainer>
              <EditUserButton
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateUser(user);
                }}
              />
              <RemoveUserButton
                onClick={(e) => {
                  e.stopPropagation();
                  deleteUser(user.id);
                }}
              />
            </ButtonsContainer>
          </UserItem>
        ))}
        <CreateUserButton onClick={() => setIsModalOpen(true)}>
          <PlusIconStyled />
          <AddUserLabel>{'Ajouter un utilisateur'}</AddUserLabel>
        </CreateUserButton>
      </UserList>
      <SubmitButton onClick={onSubmit}>{'Valider'}</SubmitButton>
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        {
          <CreateUser
            closeModal={() => setIsModalOpen(false)}
            updatedUser={updateUser}
            resetUpdateUser={() => setUpdateUser(undefined)}
          />
        }
      </Modal>
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
  margin-top: 70px;
  position: relative;
  overflow: scroll;
`;

const Title = styled(H1)`
  text-align: center;
  width: 100%;
`;

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 90%;
  margin-top: 50px;
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: row;
  width: 100%;
  border-bottom: 1px solid ${COLORS.GREY_300};
  position: relative;
  cursor: pointer;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
`;

const CheckIconStyled = styled(CheckIcon)`
  width: 24px;
  height: 24px;
  color: ${COLORS.PRIMARY_500};
`;

const UserName = styled(P1)``;

const SubmitButton = styled(P1)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  color: ${COLORS.WHITE};
  cursor: pointer;
  padding: 10px;
  height: 30px;
  border: 1px solid ${COLORS.PRIMARY_800};
  background-color: ${COLORS.PRIMARY_300};
  border-radius: 5px;
  width: 70%;
  text-align: center;
  text-transform: uppercase;
  transition: background-color 0.2s ease-in-out;
  position: absolute;
  bottom: 100px;

  &:hover {
    background-color: ${COLORS.PRIMARY_400};
  }
`;

const PlusIconStyled = styled(PlusIcon)`
  width: 24px;
  height: 24px;
  color: ${COLORS.PRIMARY_500};
  margin-right: 10px;
`;

const CreateUserButton = styled(UserItem)`
  justify-content: center;
  height: 50px;
  cursor: pointer;
`;

const AddUserLabel = styled(P1)`
  color: ${COLORS.GREY_400};

  &:hover {
    color: ${COLORS.PRIMARY_500};
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  position: absolute;
  right: 0;
`;

const RemoveUserButton = styled(TrashIcon)`
  width: 24px;
  height: 24px;
  color: ${COLORS.GREY_200};
  margin-right: 10px;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${COLORS.RED_600};
  }
`;

const EditUserButton = styled(PencilIcon)`
  width: 24px;
  height: 24px;
  color: ${COLORS.GREY_200};
  margin-right: 10px;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${COLORS.PRIMARY_600};
  }
`;
