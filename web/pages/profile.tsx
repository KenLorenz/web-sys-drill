import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';

export default function Profile() {
  return (
    <>
      <div>
        <Head>
          <title>Final Drill</title>
        </Head>

        <h1>First Post</h1>

        <div className=''>

        </div>

        <h2>
          <Link href="/">Back to home</Link>
        </h2>
      </div>
    </>
  );
}
