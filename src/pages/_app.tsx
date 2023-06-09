import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import '../themes/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default appWithTranslation(MyApp);
