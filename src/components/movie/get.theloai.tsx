'use client'
import Link from 'next/link'
import useSWR from 'swr'

const ListTheLoai = () => {
    const fetcher = (url:string) => fetch(url).then(res => res.json())
 const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_MOVIE_URL}/v1/api/the-loai`, fetcher)
 
    // handle loading and error states
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
 

  const listTheLoai = data?.data?.items;
  // render data
  return(
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:w-[400px] lg:w-[500px] max-h-[500px] overflow-y-auto p-2">
  {listTheLoai &&
    listTheLoai.map((theloai: { _id: string; name: string; slug: string }) => (
      <Link
        key={theloai._id}
        href={`/the-loai/${theloai.slug}`}
        className="p-2 block text-sm text-center bg-white text-black hover:bg-gray-200 rounded-md border"
      >
        {theloai.name}
      </Link>
    ))}
</div>

  )
}

export default ListTheLoai