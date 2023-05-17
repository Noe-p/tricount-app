import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { DynamicPages } from '../../container/pages';
import { PageBaseProps } from '../../types';

export default function index(): JSX.Element {
  return <DynamicPages />;
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
