import React, { useRef, useState } from 'react'
import Image from "next/image";
import { useSession } from "next-auth/react";
import { createPost, updatePost } from "../services/postService"
import {
    VideoCamera,
    EmojiHappy,
    Camera
  } from "heroicons-react"
import { Post } from '../types/Post';
import { uploadFileToS3 } from '../services/s3Helper';

const InputBox = () => {
    const inputRef = useRef(null)
    const filepickerRef = useRef(null)
    const [imageToPost, setImageToPost] = useState(null)
    const [file, setFile]   =   useState(null)
    const { data } = useSession()
    
    const { user } = data

    const sendPost = async (e: any) => {
        try {
            e.preventDefault();
            if (!inputRef.current?.value) return;
            const { idToken, user } = data
            const newPost : Post = { message: inputRef.current?.value }
                
            const newItem = await createPost(idToken, newPost)
            if (!newItem) {
                throw new Error('Creating post failed ...')
            }
            if (file) {
                const attachmentUrl = await uploadFileToS3(file)
                const updatePostItem = await updatePost(idToken, newItem.postId, { attachmentUrl})
                if (!updatePostItem) {
                    throw new Error('Failed to update post attachment ...')
                }
                setImageToPost(null)
                setFile(null)
            }
            inputRef.current.value = ""
        } catch (error) {
            alert(error.message)
        }
        
    }

    const addImageToPost = (e) => {
        const reader = new FileReader()
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (readerEvent) => {
            setImageToPost(readerEvent?.target?.result);
            const file = {
                name : e.target.files[0].name,
                data : Buffer.from(readerEvent?.target?.result)
            }
            setFile(file)
        }
    }

    const removeImage = () => {
        setImageToPost(null)
        setFile(null)
    }

    return (
        <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
            <div className="flex space-x-4 p-4 items-center">
                <Image
                    src={user?.image}
                    className="rounded-full cursor-pointer"
                    width={40} 
                    height={40} 
                    alt="profile picture"
                />
                <form className='flex flex-1'>
                    <input 
                        className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
                        type="text" 
                        ref={inputRef}
                        placeholder={`What's on your mind, ${user?.name} ?`} 
                    />
                    <button hidden type="submit" onClick={sendPost}></button>
                </form>

                {imageToPost && (
                    <div onClick={removeImage} className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer">
                        <img className="h-10 object-contain" src={imageToPost} alt="image-preview" />
                        <p className='text-xs text-red-500 text-center text-bold'>Remove</p>
                    </div>
                )}
            </div>

            <div className='flex justify-evenly p-3 border-t'>
                <div className='inputIcon'>
                    <VideoCamera className="h-7 text-red-500" />
                    <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
                </div>
                <div className='inputIcon' onClick={() => filepickerRef.current.click()}>
                    <Camera className="h-7 text-green-400" />
                    <p className="text-xs sm:text=sm xl:text-base">Photo/Video</p>
                    <input 
                        type="file" 
                        ref={filepickerRef}
                        onChange={addImageToPost}
                        hidden
                    />
                </div>
                <div className='inputIcon'>
                    <EmojiHappy className="h-7 text-yellow-300" />
                    <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
                </div>
            </div>
        </div>
    )
}

export default InputBox