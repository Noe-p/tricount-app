import styled from 'styled-components';
import { Layout, Link } from '../../../components';
import { ROUTES } from '../../../routing';

export function DynamicPages(): JSX.Element {
  return (
    <Layout>
      <Main>
        <Link href={`${ROUTES.dynamicPage}/${1}`}>{'Page 1'}</Link>
        <Link href={`${ROUTES.dynamicPage}/${2}`}>{'Page 2'}</Link>
      </Main>
    </Layout>
  );
}

const Main = styled.div`
  margin-top: 100px;
`;
