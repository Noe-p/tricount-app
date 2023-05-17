import Lottie from 'lottie-react';
import styled from 'styled-components';
import LoaderAnimation from '../../../public//animations/loader.json';

interface LoaderProps {
  className?: string;
  isLoaded?: boolean;
}

export function FullPageLoader(props: LoaderProps): JSX.Element {
  const { className, isLoaded } = props;

  return (
    <Main className={className} $isLoaded={isLoaded}>
      <Loader $isLoaded={isLoaded}>
        <Lottie animationData={LoaderAnimation} />
      </Loader>
    </Main>
  );
}

const Main = styled.div<{ $isLoaded?: boolean }>`
  transition: all 0.5s ease-in-out;
  overflow: hidden;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  position: fixed;
  height: ${({ $isLoaded }) => ($isLoaded ? '0' : '100vh')};
  width: 100vw;
  z-index: 100000;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: white;
  border-bottom-left-radius: ${({ $isLoaded }) => ($isLoaded ? '50%' : '0')};
  border-bottom-right-radius: ${({ $isLoaded }) => ($isLoaded ? '50%' : '0')};
`;

const Loader = styled.div<{ $isLoaded?: boolean }>`
  width: 200px;
  height: 200px;
  transition: all 0.5s ease-in-out;
  opacity: ${({ $isLoaded }) => ($isLoaded ? '0' : '1')};

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;
