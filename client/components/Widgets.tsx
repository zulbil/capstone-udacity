import React from 'react'
import PropTypes from 'prop-types'
import { DotsHorizontal, Search, VideoCamera } from 'heroicons-react';
import Contact from './Contact';

const contacts = [
    {
        name: "Mark Zuckerberg",
        src: "https://links.papareact.com/xql",
    },
    {
        name: "Bill Gates",
        src: "https://links.papareact.com/4u4"
    },
    {
        name: "Sonny Sangha",
        src: "https://links.papareact.com/zof"
    },
    {
        name: "Elon Musk",
        src: "https://links.papareact.com/4zn"
    },
    {
        name: "Jeff Bezoz",
        src: "https://links.papareact.com/k2j"
    }
]

const Widgets = () => {
  return (
    <div className='hidden lg:flex flex-col w-60 p-2 mt-5'>
        <div className='flex justify-between items-center text-gray-500 mb-5'>
            <h2 className='text-xl'>Contacts</h2>
            <div className='flex space-x-2'>
                <VideoCamera className='h-6' />
                <Search className='h-6' />
                <DotsHorizontal className='h-6' />
            </div>
        </div>
        {contacts.map((contact) => (
            <Contact
                key={contact.src} 
                src={contact.src}
                name={contact.name}
            />
        ))}
    </div>
  )
}

Widgets.propTypes = {}

export default Widgets