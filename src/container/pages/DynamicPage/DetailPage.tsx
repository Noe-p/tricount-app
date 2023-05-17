import styled from 'styled-components';
import { Layout } from '../../../components';

interface DetailPageProps {
  idPage: string;
  className?: string;
}

export function DetailPage(props: DetailPageProps): JSX.Element {
  const { idPage, className } = props;

  return (
    <Layout className={className}>
      <Main>
        <p>{`Ceci est la page d'id : ${idPage}`}</p>
      </Main>
    </Layout>
  );
}

const Main = styled.div`
  margin-top: 100px;
`;
