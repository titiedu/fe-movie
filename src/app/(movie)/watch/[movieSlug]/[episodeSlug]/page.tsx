'use client'
import { useParams } from "next/navigation";
import { HashLoader } from "react-spinners";
import useSWR from "swr";

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

    const options = {
        controls: true,
        autoplay: false,
        responsive: true,
        fluid: true,
        sources: [
            {
                src: 'https://example.com/video.mp4', // hoặc .m3u8 nếu có
                type: 'video/mp4',
            },
        ],
    };
    return (
        <div>
            <div>Watch Page {episodeSlug} - {movieSlug}</div>
            <div className="aspect-video w-full max-w-[800px] mx-auto">
                <iframe
                    src={episode?.link_embed}
                    allowFullScreen
                    frameBorder="0"
                    className="absolute top-0 left-0 w-full h-full rounded-md shadow-lg"
                ></iframe>
            </div>

        </div>
    )
}

export default WatchPage