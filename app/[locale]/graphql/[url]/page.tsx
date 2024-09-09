import { IRouteProps } from './page.props';
import { GraphiQLClient } from '@/containers';

const GraphiQLClientPage = ({ params }: IRouteProps) => <GraphiQLClient params={params} />;

export default GraphiQLClientPage;
