import Image from 'next/image';
import React from 'react'

interface StoryCardProps{
    name: string;
    src: string;
    profile: string;
}

const StoryCard = (props : StoryCardProps) => {
    const {name, src, profile} = props 

    return (
        <div className="relative h-14 w-14 md:h-20 md:w-20 lg:h-56 lg:w-32 cursor-pointer overflow-x p-3">
            <Image
                className="absolute opacity-0 lg:opacity-100 rounded-full z-50 top-10"
                src={profile}
                width={40}
                height={40}
                alt={profile}
             />
             <Image
                className="object-cover filter brightness-75 rounded-full lg:rounded-3xl"
                src={src}
                width={20}
                height={20}
                alt={name}
             />
        </div>
    )
}

export default StoryCard