import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import InputBox from './InputBox'
import Posts from './Posts'
import Stories from './Stories'
import { getPosts } from '../services/postService'

interface FeedProps {
  posts: any[]
}
const Feed = ({ posts }: FeedProps) => {
  const [postData, setPostData] = useState(posts)
  const [dataSuccess, setDataSuccess] = useState(false)
  const { data }  = useSession()
  const idToken   = ( data && data.idToken ) ? data.idToken :  null

  const fetchPost = async () => {
    try {
      const data = await getPosts(idToken)
      setPostData(data) 
    } catch (error) {
      setPostData([]) 
    }
  }

  function refreshPost(){
    setDataSuccess(true)
  }

  useEffect(() => {
   fetchPost()
  }, [dataSuccess])
  

  return (
    <div className="flex-grow h-screen pb-44 pt-6 mr-4 xl:mr-40 overflow-y-auto scrollbar-hide">
        <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl">
            <Stories />
            <InputBox onRefreshPost={refreshPost} />
            <Posts posts={postData}/>
        </div>
    </div>
  )
}

export default Feed