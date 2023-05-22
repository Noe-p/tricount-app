import { ReactNode } from 'react';
import styled from 'styled-components';
import { Footer } from '../Footer';

interface LayoutProps {
  children?: ReactNode;
  className?: string;
}

export function Layout(props: LayoutProps): JSX.Element {
  const { children, className } = props;

  return (
    <Main className={className}>
      <MainPage>
        <Page>{children}</Page>
        <Footer />
      </MainPage>
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const MainPage = styled.div`
  height: 100%;
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
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
