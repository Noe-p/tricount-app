import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { AboutPage } from '../container/pages';
import { PageBaseProps } from '../types';

export default function IndexPage(): JSX.Element {
  return <AboutPage />;
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
