import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { FullPageLoader } from '../../components';
import { DetailPage } from '../../container/pages';
import { PageBaseProps } from '../../types';

type DynamicPageExempleProps = {
  idPage: string;
};

export default function DynamicPageExemple(
  props: DynamicPageExempleProps
): JSX.Element {
  const { idPage } = props;
  if (!idPage) return <FullPageLoader />;
  return <DetailPage idPage={idPage} />;
}

export async function getStaticProps({
  locale,
  params,
}: {
  locale: string;
  params: { slug: string };
}): Promise<PageBaseProps> {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
      idPage: params.slug,
    },
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}
