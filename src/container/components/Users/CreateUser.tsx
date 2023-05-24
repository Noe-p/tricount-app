import { useState } from 'react';
import styled from 'styled-components';
import { H1, Input, P1 } from '../../../components';
import { createUser, updateUser } from '../../../services/api/apiService';
import { COLORS } from '../../../themes';
import { User } from '../../../types';

interface CreateUserProps {
  className?: string;
  closeModal: () => void;
  updatedUser?: User;
  resetUpdateUser?: () => void;
}

export function CreateUser(props: CreateUserProps): JSX.Element {
  const { className, closeModal, updatedUser, resetUpdateUser } = props;
  const [lastName, setLastName] = useState(updatedUser?.lastName || '');
  const [firstName, setFirstName] = useState(updatedUser?.firstName || '');
  const [email, setEmail] = useState(updatedUser?.email || '');

  async function onSubmit() {
    if (lastName !== '' && firstName !== '' && email !== '') {
      await createUser({ lastName, firstName, email });
      closeModal();
      init();
      resetUpdateUser && resetUpdateUser();
    }
  }

  async function onUpdate() {
    if (updatedUser && lastName !== '' && firstName !== '' && email !== '') {
      await updateUser(updatedUser.id, { lastName, firstName, email });
      closeModal();
      init();
      resetUpdateUser && resetUpdateUser();
    }
  }

  function init() {
    setLastName('');
    setFirstName('');
    setEmail('');
  }

  return (
    <Main className={className}>
      <AnnulerButton onClick={closeModal}>{'Annuler'}</AnnulerButton>

      <Title>{'Créer un utilisateur'}</Title>
      <Form>
        <InputStyled
          placeholder={'Nom'}
          value={lastName}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setLastName(e.currentTarget.value)
          }
        />
        <InputStyled
          placeholder={'Prénom'}
          value={firstName}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setFirstName(e.currentTarget.value)
          }
        />
        <InputStyled
          placeholder={'Email'}
          value={email}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setEmail(e.currentTarget.value)
          }
        />
        {updatedUser ? (
          <SubmitButton onClick={() => onUpdate()}>{'Modifier'}</SubmitButton>
        ) : (
          <SubmitButton onClick={() => onSubmit()}>{'Créer'}</SubmitButton>
        )}
      </Form>
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: scroll;
`;

const Title = styled(H1)`
  text-align: center;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 90%;
  margin-top: 50px;
`;

const InputStyled = styled(Input)`
  margin-top: 20px;
`;

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

  &:hover {
    background-color: ${COLORS.PRIMARY_400};
  }
`;

const AnnulerButton = styled(P1)`
  color: ${COLORS.PRIMARY_500};
  cursor: pointer;
  position: absolute;
  top: 40px;
  left: 40px;
  text-transform: uppercase;
`;
