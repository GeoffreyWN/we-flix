import Image from 'next/image'
import React from 'react'

interface Props {
    imgUrl: string
}

const Thumb = ({ imgUrl }: Props) => (
    <Image
        placeholder='blur'
        blurDataURL='/placeholder.jpg'
        className='rounded-lg object-cover '
        fill
        src={imgUrl}
        alt='thumb-nail'
    />
)


export default Thumb