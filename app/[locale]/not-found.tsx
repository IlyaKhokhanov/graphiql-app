import Link from 'next/link';

const NotFound = () => {
  return (
    <>
      <h2>404 - Page Not Found</h2>
      <Link href="/">Go back to home</Link>
    </>
  );
};

export default NotFound;
