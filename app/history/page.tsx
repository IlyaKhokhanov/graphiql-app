import Link from 'next/link';

const History = () => {
  return (
    <>
      <h1>History</h1>
      <ul>
        <li>
          <Link href="/rest/GET/someUrl">GET someUrl</Link>
        </li>
        <li>
          <Link href="/graphql/someUrl">GraphiQL someUrl</Link>
        </li>
      </ul>
    </>
  );
};

export default History;
