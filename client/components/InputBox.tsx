import React, { useRef, useState } from 'react'
import Image from "next/image";
import { useSession } from "next-auth/react";
import { createPost, getUploadUrl, updatePost, uploadFile } from "../services/postService"
import {
    VideoCamera,
    EmojiHappy,
    Camera
  } from "heroicons-react"
import { Post } from '../types/Post';

interface InputBoxProps {
    onRefreshPost: any
}

const InputBox = ({ onRefreshPost } : InputBoxProps) => {
    const inputRef                          = useRef(null)
    const filepickerRef                     = useRef(null)
    const [imageToPost, setImageToPost]     = useState(null)
    const [file, setFile]                   = useState(null)
    const [loading, setLoading]             = useState(false)
    const [error, setError]                 = useState('')
    const { data }                          = useSession()
    
    const { user } = data

    const sendPost = async (e: any) => {
        try {
            e.preventDefault();
            setLoading(true)
            if (!inputRef.current?.value) throw new Error("Your input is required");
            const { idToken, user } = data
            const newPost : Post = { message: inputRef.current?.value }
                
            const newItem = await createPost(idToken, newPost)
            if (!newItem) {
                throw new Error('Creating post failed ...')
            }
            if (file) {
                const postId = newItem.postId ? newItem.postId : ''
                const uploadUrl = await getUploadUrl(idToken, postId)
                await uploadFile(uploadUrl, file);
                setImageToPost(null)
                setFile(null)
            }
            inputRef.current.value = ""
            setLoading(false)
            onRefreshPost()
        } catch (error: any) {
            setLoading(false)
            setError(error.message)
            alert(error.message)
        }
        
    }

    const addImageToPost = (e: any) => {
        const reader = new FileReader()
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (readerEvent : any) => {
            setImageToPost(readerEvent?.target?.result);
            setFile(e.target.files[0])
        }
    }

    const removeImage = () => {
        setImageToPost(null)
        setFile(null)
    }

    return (
        <>
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
            {loading && (
                <div className="flex justify-center items-center mt-5">
                    <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
            {error && (
                <div className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3 mt-5" role="alert">
                    <b>{error}</b>
                </div>
            )}
        </>
    )
}

export default InputBox