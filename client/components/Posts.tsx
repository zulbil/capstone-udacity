import React, { useEffect } from 'react'
import { useSession } from "next-auth/react";
import Post from './Post';

interface PostsProp {
    posts: any
}
const Posts = ({posts}: PostsProp) => {

    return (
        <div>
            {posts.map((post:any) => (
                <Post
                    key={post.id}
                    message={post.message}
                    attachmentUrl={post.attachmentUrl}
                    createdAt={post.createdAt}
                    updatedAt={post.updatedAt}
                 />
            ))}
        </div>
    )
}

export default Posts