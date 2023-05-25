import {
  CheckIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal, P1 } from '../../../components';
import { getAllUsers, removeUser } from '../../../services/api/apiService';
import { setCookie } from '../../../services/cookies';
import { COLORS } from '../../../themes';
import { User } from '../../../types';
import { CreateUser } from './CreateUser';

interface ChooseUserPageProps {
  className?: string;
  setUserSelected: (user: User) => void;
  userSelected?: User;
}

export function ChooseUserPage(props: ChooseUserPageProps): JSX.Element {
  const { className, setUserSelected, userSelected } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<User[]>();
  const [updateUser, setUpdateUser] = useState<User>();

  async function fetchAllUsers() {
    const users = await getAllUsers();
    setUsers(users);
  }

  function handleUserClick(user: User) {
    setUserSelected(user);
    setCookie('userId', user.id);
  }

  useEffect(() => {
    fetchAllUsers();
  }, [updateUser, isModalOpen]);

  async function deleteUser(userId: string) {
    await removeUser(userId);
    fetchAllUsers();
  }

  function onUpdateUser(user: User) {
    setUpdateUser(user);
    setIsModalOpen(true);
  }

  return (
    <Main className={className}>
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
  position: relative;
  overflow: scroll;
  padding-bottom: 100px;
`;

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 90%;
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
