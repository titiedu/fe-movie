'use client'
import { useParams, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { HashLoader } from 'react-spinners'
import useSWR from 'swr'
import { IoLogoBuffer } from "react-icons/io";
import MoviePagination from '@/components/movie/movie-pagination'
import { useEffect, useState } from 'react'

const TheLoaiPage = () => {
    const {slug} = useParams()
    const searchParams = useSearchParams()
    const trang = searchParams.get('trang') || '1' // Default to page 1
    const [page, setPage] = useState<number | null>(null)
    const [limit, setLimit] = useState<number | null>(null)
    const [totalItems, setTotalItems] = useState<number | null>(null)
    const fetcher = (url: string) => fetch(url).then(res => res.json())
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_MOVIE_URL}/v1/api/the-loai/${slug}/?page=${trang}`, fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    )
    const dataMovies: IListMovie[] = data?.data?.items || []
     useEffect(() => {
        if (data?.status ==="success") {
            setPage(data.data.params.pagination.currentPage)
            setTotalItems(data.data.params.pagination.totalItems)
            setLimit(data.data.params.pagination.totalItemsPerPage)
        }
    }, [data])
    if (error) return <div>failed to load</div>
    if (isLoading) return (
        <div className="flex justify-center items-center min-h-[400px]">
            <HashLoader color="#3B82F6" />
        </div>
    )
    const totalPages = totalItems && limit ? Math.ceil(totalItems / limit) : 0;
    return (
        <div className='container px-4 mx-auto'>
            <div className='w-full flex justify-between items-center bg-gray-800 p-1 text-white border-radius-2xl mt-4 mb-2'>
                <h2 className='w-full text-xl font-bold m-4'>
                    PHIM PHÁT HÀNH NĂM {slug?.toString().toUpperCase()}
                    {totalItems && (
                        <span className='text-sm font-normal text-gray-300 ml-2'>
                            ({totalItems} kết quả)
                        </span>
                    )}
                </h2>
                <div className='w-full text-right mr-4'>
                    <Link href="/home" className='text-blue-500 hover:underline'>Xem tất cả</Link>
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {
                    dataMovies.map((movie: IListMovie) => (
                        <Link href={`/info/${movie.slug}`} key={movie.slug} className="cursor-pointer hover:scale-105 transition-all duration-300 bg-[#0E0C23] rounded-lg
                 flex flex-col border border-gray-700 p-2">
                            <div className='relative w-full h-0 pb-[150%] mb-2 gap-2 rounded-lg overflow-hidden'>
                                <Image src={`${process.env.NEXT_PUBLIC_API_IMG_URL}${movie.thumb_url}`} alt={movie.thumb_url} layout="fill"
                                    objectFit="cover" />
                                <div className='absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded'>{movie.quality}</div>
                            </div>
                            <div className='flex flex-col items-start'>
                                <span className='text-white text-sm font-semibold'>{movie.name}</span>
                                <span className='text-gray-400 text-xs'>{movie.episode_current} - {movie.year}</span>
                            </div>
                        </Link>
                    ))
                }
                <Link href={``} className='cursor-pointer hover:scale-105 transition-all duration-300 bg-[#0E0C23] rounded-lg
                 flex flex-col border border-gray-700 p-2 justify-center items-center'>
                    <IoLogoBuffer className='size-6/12' />
                    <span className='text-white text-sm font-semibold mt-2'>Xem thêm</span>
                </Link>
            </div>
            
            {/* Pagination Component */}
            {page && totalItems && limit && (
                <MoviePagination
                    currentPage={page}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    itemsPerPage={limit}
                    baseUrl={`/the-loai/${slug}`}
                    className="mt-8 mb-4"
                />
            )}
        </div >
    )
}


export default TheLoaiPage