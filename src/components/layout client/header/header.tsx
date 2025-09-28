import Link from 'next/link'

const Header = () => {
    return (
        <div className='w-full h-16 bg-gray-800 text-white flex items-center px-4'>
            <Link className='text-lg font-bold' href="/">Movie App</Link>
            <nav className='ml-auto'>
                <Link className='mx-2 hover:underline' href="/">Home</Link>
            </nav>
        </div>
    )
}

export default Header