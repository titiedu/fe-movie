'use client'
import { useParams } from "next/navigation";
import { HashLoader } from "react-spinners";
import useSWR from "swr";
import Link from 'next/link'
import PhimKhac from "@/components/movie/phim.khac";

const WatchPage = () => {
    const { episodeSlug, movieSlug } = useParams<{ episodeSlug: string; movieSlug: string }>();
    const codePhim = (parseInt(episodeSlug === 'Full' || episodeSlug === 'full' ? '1' : episodeSlug) - 1);
    const fetcher = (url: string) => fetch(url).then(res => res.json())
    const { data, error, isLoading } = useSWR(movieSlug ? `${process.env.NEXT_PUBLIC_API_MOVIE_URL}/v1/api/phim/${movieSlug}` : null, fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    )
    const episode: IEpisode = data?.data?.item?.episodes[0]?.server_data[codePhim] || {}
    if (error) return <div>failed to load</div>
    if (isLoading) return <HashLoader />

    const phim: IPhim = data?.data?.item || {}
    return (
        <div className='container px-4 mx-auto my-8'>
            <h1 className='text-2xl font-bold'>{data?.data?.seoOnPage?.seoSchema?.name || 'Unknown'}</h1>
            <div className="w-full mx-auto flex flex-col md:flex-row gap-4">
                <div className="h-full w-4/4 md:w-3/4">
                    <iframe
                        src={episode?.link_embed}
                        allowFullScreen
                        frameBorder="0"
                        className="aspect-video mt-5 w-full h-full rounded-md shadow-lg"
                    ></iframe>
                </div>
                <div className="w-4/4 md:w-1/4">
                    <h2 className="text-lg font-semibold mt-4">DANH SÁCH TẬP</h2>
                    <div className='border-t pt-4'>
                        <div className=' w-full overflow-y-auto max-h-[400px] flex flex-wrap gap-4 mt-2'>
                            {phim?.episodes[0]?.server_data.map((episode: IEpisode) => (
                                <Link href={`/watch/${phim?.slug}/${episode?.name}`} key={episode?.slug} className=' block p-2 bg-gray-200 rounded hover:bg-gray-300 col-span-1 text-center cursor-pointer text-black w-20'>
                                    {episode?.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full mt-8 border-t pt-4">
                <h2 className="text-lg font-semibold mb-4">PHIM KHÁC</h2>
                <PhimKhac category={phim?.category[0]} />
            </div>
        </div>
    )
}

export default WatchPage