'use client'
import Image from 'next/image'
import Link from 'next/link'
import { HashLoader } from 'react-spinners'
import useSWR from 'swr'
import { IoLogoBuffer } from "react-icons/io";

const ListMovie = () => {
    const fetcher = (url: string) => fetch(url).then(res => res.json())
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_MOVIE_URL}/v1/api/home`, fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    )
    const dataMovies: any[] = data?.data?.items || []
    if (error) return <div>failed to load</div>
    if (isLoading) return <HashLoader />
    return (
        <div className='container mx-auto px-4 flex flex-wrap bg-zinc-200'>
            <div className='w-full flex justify-between items-center bg-gray-800 p-2 text-white border-radius-2xl mt-4'>
                <h2 className='w-full text-xl font-bold m-4'>Mới cập nhật</h2>
                <Link href="/home" className='text-blue-500 hover:underline'>Xem tất cả</Link>
            </div>
            {
                dataMovies.map((movie: IListMovie) => (
                    <Link href={`/info/${movie.slug}`} key={movie.slug} className='w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 p-2
                     cursor-pointer hover:scale-105 transition-all duration-300'>
                        <Image src={`${process.env.NEXT_PUBLIC_API_IMG_URL}${movie.thumb_url}`} alt={movie.thumb_url} width={300} height={450} />
                        <h2>{movie.name}</h2>
                    </Link>
                ))
            }
            <Link href={``} className='w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 p-2
                     cursor-pointer hover:scale-105 transition-all duration-300
                     align-center justify-center flex border-dashed border-2 border-gray-400 text-gray-400'>
                <IoLogoBuffer className='size-6/12' />
            </Link>
        </div>
    )
}

export default ListMovie