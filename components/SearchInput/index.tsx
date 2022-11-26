'use client'

import Image from 'next/image'
import React, { useRef, useState } from 'react'
import TMDBLogo from '../../public/tmdb-logo.svg'


interface Props {
  setQuery: React.Dispatch<React.SetStateAction<string>>
}

const TIME = 350 //ms

const SearchInput = ({ setQuery }: Props) => {
  const [text, setText] = useState('')

  const timer = useRef<NodeJS.Timeout>()

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value

    clearTimeout(timer.current)

    setText(value)

    timer.current = setTimeout(() => {
      setQuery(value)
    }, TIME)
  }

  return (
    <>
      <input
        className="h-10 pr-14 md:w-96 rounded-full p-4 text-md bg-zinc-700 text-white focus:outline-none focus:border focus:border-solid focus:border-cyan-200" type="text"
        placeholder="Search Movie"
        value={text}
        onChange={handleInput}
      />
      <div className="absolute right-4 top-9" >
        <Image src={TMDBLogo}width="30" height="32" alt="Search" />
      </div>
    </>
  )
}

export default SearchInput