'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { HashLoader } from 'react-spinners'
import useSWR from 'swr'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PhimKhac from '@/components/movie/phim.khac'

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
        <div className='container px-4 mx-auto'>
            <div className='movie-info my-8 border p-4 rounded-lg shadow-md'>
                <div className='show-info flex flex-col  sm:flex-row w-full'>
                    <div className='poster w-5/12 sm:basis-1/4 relative'>
                        <div className='relative w-full h-0 pb-[150%] rounded overflow-hidden'>
                            <Image
                                src={`${process.env.NEXT_PUBLIC_API_IMG_URL}${phim.thumb_url}`}
                                alt={phim?.name}
                                layout="fill"
                                objectFit="cover"
                                className='hover:scale-105 transition-transform duration-300'
                            />
                            <Link
                                href={`/watch/${phim?.slug}/1`}
                                className="absolute w-full bg-red-600 bottom-0 hover:bg-red-700 text-white text-center py-2 transition-colors"
                            >
                                Xem Phim
                            </Link>
                        </div>
                    </div>
                    <div className='info w-12/12 sm:basis-3/4 sm:pl-4 mt-4 sm:mt-0 relative'>
                        <h1 className='text-2xl font-bold'>{phim?.name || 'Unknown'}</h1>
                        <ScrollArea className="h-48 mt-2 pr-3 text-justify border-t pt-2 ">
                            {phim?.content ? (
                                <div dangerouslySetInnerHTML={{ __html: phim.content }} />
                            ) : (
                                'No description available.'
                            )}
                        </ScrollArea>
                        <div className='border-t pt-4'>
                            <Tabs defaultValue="dstap" className="w-full">
                                <TabsList>
                                    <TabsTrigger value="dstap" className='text-xl font-bold'>Danh sách tập</TabsTrigger>
                                    <TabsTrigger value="moviekhac" className='text-xl font-bold'>Phim khác</TabsTrigger>
                                </TabsList>
                                <TabsContent value="dstap" className='episode-list '>
                                    <div className=' w-full overflow-y-auto max-h-[300px] flex flex-wrap gap-4 mt-2'>
                                        {phim?.episodes[0]?.server_data.map((episode: IEpisode) => (
                                            <Link href={`/watch/${phim?.slug}/${episode?.name}`} key={episode?.slug} className=' block p-2 bg-gray-200 rounded hover:bg-gray-300 col-span-1 text-center cursor-pointer text-black w-20'>
                                                {episode?.name}
                                            </Link>
                                        ))}
                                    </div>
                                </TabsContent>
                                <TabsContent value="moviekhac">
                                    <PhimKhac category={phim?.category[0]} />

                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default InfoPage