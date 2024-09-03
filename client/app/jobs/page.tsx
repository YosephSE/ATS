import Head from 'next/head';
import JobList from '../../components/JobList'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Glassdoor Clone</title>
        <meta name="description" content="A Glassdoor clone created with Next.js and Tailwind CSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <JobList />
      </main>
    </div>
  );
}
