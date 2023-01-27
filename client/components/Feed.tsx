import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import InputBox from './InputBox'
import Posts from './Posts'
import Stories from './Stories'
import { getPosts } from '../services/postService'

const Feed = () => {
  const [postData, setPostData]         =   useState<any[]>([])
  const [newPost, setNewPost]           =   useState({})
  const session                         =   useSession()
  const data                            =   session?.data
  const idToken                         =   data?.user?.idToken

  console.log('ID TOKEN ', idToken)

  const fetchPost = async () => {
    try {
      const data = await getPosts(idToken)
      setPostData(data) 
    } catch (error) {
      setPostData([]) 
    }
  }

  function addPost(post: any){
    setNewPost(post)
  }

  useEffect(() => {
   fetchPost()
  }, [newPost])
  

  return (
    <div className="flex-grow h-screen pb-44 pt-6 mr-4 xl:mr-40 overflow-y-auto scrollbar-hide">
        <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl">
            <Stories />
            <InputBox onAddPost={addPost} />
            <Posts posts={postData} />
        </div>
    </div>
  )
}

export default Feed