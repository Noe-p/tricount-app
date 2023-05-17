import { useTranslation } from 'next-i18next';
import styled from 'styled-components';
import { H1, Layout } from '../../components';

export function AboutPage(): JSX.Element {
  const { t } = useTranslation();

  return (
    <Layout>
      <Main>
        <H1>{t('about.name')}</H1>
      </Main>
    </Layout>
  );
}

const Main = styled.div`
  margin-top: 100px;
`;
