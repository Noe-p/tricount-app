import { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { Footer, FullPageLoader } from '..';
import { NavBar } from '../Navbar';

interface LayoutProps {
  children?: ReactNode;
  className?: string;
  isNavClose?: boolean;
}

export function Layout(props: LayoutProps): JSX.Element {
  const { children, className, isNavClose } = props;
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Main className={className} onLoad={() => setIsLoaded(true)}>
      <MainPage $isLoaded={isLoaded}>
        <NavBar isClose={isNavClose} />
        <Page>{children}</Page>
        <Footer />
      </MainPage>
      <FullPageLoader isLoaded={isLoaded} />
    </Main>
  );
}

const Main = styled.div``;

const MainPage = styled.div<{ $isLoaded: boolean }>`
  opacity: ${({ $isLoaded }) => ($isLoaded ? 1 : 0)};
  z-index: ${({ $isLoaded }) => ($isLoaded ? 0 : -5)};
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: -5;
  min-height: 70vh;
`;
