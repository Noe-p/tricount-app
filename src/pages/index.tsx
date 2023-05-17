import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { HomePage } from '../container/pages';
import { PageBaseProps } from '../types';

export default function IndexPage(): JSX.Element {
  return <HomePage />;
}

export async function getStaticProps({
  locale,
}: {
  locale: string;
}): Promise<PageBaseProps> {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
