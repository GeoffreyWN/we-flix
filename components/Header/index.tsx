import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SearchInput from '../SearchInput'
import RMDBLogo from '../../public/rmdb-logo.svg'
import RMDBLogoSmall from '../../public/rmdb-logo-small.svg'

interface Props {
    setQuery?: React.Dispatch<React.SetStateAction<string>>
}

const Header = ({ setQuery }: Props) => (
    <div className="sticky flex top-0 z-40 w-full h-24 bg-zinc-900" >
        <div className="flex justify-between w-full h-full max-w-7xl px-4 m-auto" >
            <Link className="flex" href="/">
                <div className="flex items-center cursor-pointer">
                    <div className="invisible md:visible" >
                        <Image priority src={RMDBLogo} alt="logo" />
                    </div>

                    <div className="absolute md:invisible pt-2" >
                        <Image priority src={RMDBLogoSmall} alt="logosmall" />
                    </div>
                </div>
            </Link>

            {setQuery && (
                <div className="relative flex items-center" >
                    <SearchInput setQuery={setQuery} />
                </div>
            )}

        </div>
    </div>
)


export default Header