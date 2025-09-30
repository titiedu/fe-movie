import Link from 'next/link'
import movieLogo from '../../../../public/movie.png'
import Image from 'next/image'
const Header = () => {
    return (
        <div className='w-full h-16 bg-gray-800 text-white flex items-center px-4'>
            <Link className='text-lg font-bold' href="/">
                <Image src={movieLogo} alt="Movie App" width={250} height={100} />
            </Link>
            <nav className='ml-auto'>
                <Link className='mx-2 hover:underline' href="/">Home</Link>
            </nav>
        </div>
    )
}

export default Header