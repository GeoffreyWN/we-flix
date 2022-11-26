import Image from 'next/image'
import React from 'react'

interface Props {
    imgUrl: string
}

const Thumb = ({ imgUrl }: Props) => (
    <Image
        placeholder='blur'
        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPMSWKoBwADXwFPvK02gAAAAABJRU5ErkJggg=='
        className='rounded-lg object-cover '
        fill
        sizes='(max-width:768px) 100vw, (max-width:1200px) 20vw'
        src={imgUrl}
        alt='thumb-nail'
    />
)


export default Thumb