import { ReactNode } from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import { COLORS } from '../../themes';

interface ModalProps extends ReactModal.Props {
  children?: ReactNode;
}

export function Modal(props: ModalProps): JSX.Element {
  const { children } = props;

  return (
    <ReactModalStyled
      closeTimeoutMS={200}
      ariaHideApp={false}
      {...props}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
    >
      {children}
    </ReactModalStyled>
  );
}

const ReactModalStyled = styled(ReactModal)`
  display: flex;
  background-color: ${COLORS.GREY_100};
  width: 50vw;
  height: 100vh;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  transform: translateX(50%);

  @media (max-width: 768px) {
    width: 100vw;
    transform: translateX(0);
  }
`;
