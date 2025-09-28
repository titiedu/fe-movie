'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { HashLoader } from 'react-spinners'
import useSWR from 'swr'

const InfoPage = () => {
    const { slug } = useParams();
    const fetcher = (url: string) => fetch(url).then(res => res.json())
    const { data, error, isLoading } = useSWR(slug ? `${process.env.NEXT_PUBLIC_API_MOVIE_URL}/v1/api/phim/${slug}` : null, fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    )
    const phim: IPhim = data?.data?.item || {}
    if (error) return <div>failed to load</div>
    if (isLoading) return <HashLoader />

    return (
        <div className='container mx-auto'>
            <div className='show-info flex flex-row gap-4'>
                <div className='poster basis-1/4'>
                    <Image
                        src={`${process.env.NEXT_PUBLIC_API_IMG_URL}${phim.thumb_url}`}
                        alt={phim?.name}
                        width={200}
                        height={300}
                    />
                </div>
                <div className='info basis-3/4'>
                    <h1 className='text-2xl font-bold'>{phim?.name || 'Unknown'}</h1>
                    <p className='text-gray-600'>Description: {phim?.content || 'No description available.'}</p>
                </div>
            </div>
            <div className='mt-4'>
                <h2>Danh sách tập</h2>
                <div className='episode-list grid grid-cols-4 gap-4'>
                    {phim?.episodes[0]?.server_data.map((episode: IEpisode) => (
                        <Link href={`/watch/${phim?.slug}/${episode?.slug}`} key={episode?.slug} className='episode-item'>
                            {episode?.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default InfoPage