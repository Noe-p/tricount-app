import { Layout } from '../../components';
import { ExpenseList } from '../components';

export function HomePage(): JSX.Element {
  return (
    // eslint-disable-next-line react/jsx-no-undef
    <Layout>
      <ExpenseList />
    </Layout>
  );
}
