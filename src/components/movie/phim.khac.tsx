'use client'
import Image from 'next/image'
import Link from 'next/link'
import { HashLoader } from 'react-spinners'
import useSWR from 'swr'

const PhimKhac = ({ category }: { category: { slug: string } }) => {
    const fetcher = (url: string) => fetch(url).then(res => res.json())
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_MOVIE_URL}/v1/api/the-loai/${category.slug}`, fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    )
    const dataMovies: IListMovie[] = data?.data?.items || []
    if (error) return <div>failed to load</div>
    if (isLoading) return (
        <div className="flex justify-center items-center min-h-[400px]">
            <HashLoader color="#3B82F6" />
        </div>
    )
    return (
        <div className='w-full mt-4 flex overflow-y-auto flex-wrap h-[400px]'>
            {
                dataMovies.length > 0 ? dataMovies.map((movie) => (
                    <Link href={`/info/${movie.slug}`} className='w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 p-2' key={movie._id}>
                        <div className='relative w-full h-0 pb-[150%] mb-2 rounded-lg overflow-hidden'>
                            <Image src={`${process.env.NEXT_PUBLIC_API_IMG_URL}${movie.thumb_url}`} alt={movie.thumb_url} layout="fill"
                                objectFit="cover" />
                            <div className='absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded'>{movie.quality}</div>
                        </div>
                        <div className='flex flex-col items-start'>
                            <span className='text-white text-sm font-semibold'>{movie.name}</span>
                            <span className='text-gray-400 text-xs'>{movie.episode_current} - {movie.year}</span>
                        </div>
                    </Link>
                )) : (
                    <div className='w-full text-center py-4'>No movies found.</div>
                )}
        </div>
    )
}


export default PhimKhac