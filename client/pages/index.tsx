import { getSession } from 'next-auth/react'
import Head from 'next/head'
import Header from '../components/Header'
import { GetServerSideProps } from 'next';
import Login from '../components/Login';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import { Session } from 'next-auth';
import { getPosts } from '../services/postService';
import { Post } from '../types/Post';
import Widgets from '../components/Widgets';

interface HomeProps {
  session: Promise<Session>,
  posts: any[]
}

export default function Home({ session, posts } : HomeProps) {
  if (!session) return <Login />
  return (
    <div>
      <Head>
        <title>Facebook</title>
      </Head>
      <Header></Header>
      <main className="flex">
        <Sidebar />
        <Feed posts={posts} />
        <Widgets />
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  console.log('Sesssion :', session)
  const  idToken  = session ? session.idToken : null
  console.log('ID Token ', idToken)
  const posts = await getPosts(idToken)
  console.log('POSTS :', posts)
  return {
    props: {
      session,
      posts
    }
  }
};

