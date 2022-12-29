import { getSession } from 'next-auth/react'
import Head from 'next/head'
import Header from '../components/Header'
import { GetServerSideProps } from 'next';
import Login from '../components/Login';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import { Session } from 'next-auth';

interface HomeProps {
  session: Promise<Session>
}

export default function Home({ session } : HomeProps) {
  if (!session) return <Login />
  return (
    <div>
      <Head>
        <title>Facebook</title>
      </Head>
      <Header></Header>
      <main className="flex">
        {/* Sidebar */}
        <Sidebar />
        <Feed />
        {/* Widgets */}
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  return {
    props: {
      session
    }
  }
};

