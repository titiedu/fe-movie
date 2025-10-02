'use client'
import Link from 'next/link'
import useSWR from 'swr'

const ListNam = () => {
    const fetcher = (url:string) => fetch(url).then(res => res.json())
 const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_MOVIE_URL}/v1/api/nam-phat-hanh`, fetcher)

    // handle loading and error states
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
 

  const listTheLoai = data?.data?.items;
  // render data
  return(
    <div className="grid grid-cols-1 gap-2 md:w-[100px] lg:w-[100px] h-[500px] overflow-y-auto">
  {listTheLoai &&
    listTheLoai.map((theloai: { year: number }) => (
      <Link
        key={theloai.year}
        href={`/nam-phat-hanh/${theloai.year}`}
        className="p-2 block text-sm text-center bg-white text-black hover:bg-gray-200 rounded-md border"
      >
        {theloai.year}
      </Link>
    ))}
</div>

  )
}

export default ListNam