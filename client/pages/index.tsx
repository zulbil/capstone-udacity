import { getSession } from 'next-auth/react'
import Head from 'next/head'
import Header from '../components/Header'
import { GetServerSideProps } from 'next';
import Login from '../components/Login';

export default function Home({ session }) {
  if (!session) return <Login />
  return (
    <div>
      <Head>
        <title>Facebook</title>
      </Head>
      <Header></Header>
      <main>
        {/* Sidebar */}
        {/* Feed */}
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

