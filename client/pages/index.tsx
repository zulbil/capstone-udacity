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
import { useAuthContext } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';

interface HomeProps {
  session: Promise<Session>
}

export default function Home({ session } : HomeProps) {

  const { authData, setAuthData } = useAuthContext()

  useEffect(()=> {
    setAuthData({ ...authData, session })
  }, [])

  if (!session) return <Login />
  return (
    <div>
      <Head>
        <title>Facebook</title>
      </Head>
      <Header></Header>
      <main className="flex">
        <Sidebar />
        <Feed />
        <Widgets />
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session   =   await getSession(context)
  return {
    props: {
      session
    }
  }
};

