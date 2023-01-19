import { ChatAlt, Share, ThumbUp } from 'heroicons-react';
import Image from 'next/image';
import React from 'react'

interface PostProp {
    message: string;
    attachmentUrl: string;
    createdAt: string;
    updatedAt: string;
}

const Post = (props: PostProp) => {
  const {message, attachmentUrl, createdAt, updatedAt } = props
  return (
    <div className='flex flex-col'>
      <div className='p-5 bg-white mt-5 rounded-t-2xl shadow-sm'>
        <div className='flex items-center space-x-2'>
          <Image 
            className='rounded-full' 
            src={attachmentUrl} 
            width={40}
            height={40}
            alt={attachmentUrl}
            style={{objectFit: 'cover'}}
          />
          <div>
            <p className='font-medium'></p>
            <p className='text-xs text-gray-400'>
              {createdAt}
            </p>
          </div>
        </div>
        <p className='pt-4'>{message}</p>
      </div>
      { attachmentUrl && (
        <div className='relative h-56 md:h-96 bg-white'>
          <Image 
            className='rounded-full' 
            src={attachmentUrl} 
            alt={attachmentUrl}
            width={100}
            height={100}
            style={{objectFit: 'cover'}}
          />
        </div>
      )}

      <div className='flex justify-between items-center rounded-b-2xk bg-white shadow-md text-gray-400 border-t'>
        <div className='inputIcon rounded-none rounded-bl-2xl'>
          <ThumbUp className='h-4' />
          <p className='text-xs sm:text-base'>Like</p>
        </div>
        <div className='inputIcon rounded-none'>
          <ChatAlt className='h-4' />
          <p className='text-xs sm:text-base'>Comment</p>
        </div>
        <div className='inputIcon rounded-none rounded-br-2xl'>
          <Share className='h-4' />
          <p className='text-xs sm:text-base'>Share</p>
        </div>
      </div>
    </div>
  )
}

export default Post