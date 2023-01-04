import React, { useRef } from 'react'
import Image from "next/image";
import axios from 'axios';
import { useSession } from "next-auth/react";
import {
    VideoCamera,
    EmojiHappy,
    Camera
  } from "heroicons-react"

const InputBox = () => {
    const inputRef = useRef(null)
    const { data } = useSession()
    
    const { user } = data

    const sendPost = async (e: any) => {
        e.preventDefault();
        if (!inputRef.current?.value) return;

        console.log(data);
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
            </div>

            <div className='flex justify-evenly p-3 border-t'>
                <div className='inputIcon'>
                    <VideoCamera className="h-7 text-red-500" />
                    <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
                </div>
                <div className='inputIcon'>
                    <Camera className="h-7 text-green-400" />
                    <p className="text-xs sm:text=sm xl:text-base">Photo/Video</p>
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