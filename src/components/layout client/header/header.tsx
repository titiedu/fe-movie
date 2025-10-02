
import Link from 'next/link'
import movieLogo from '../../../../public/movie.png'
import Image from 'next/image'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import ListTheLoai from '@/components/movie/get.theloai'
import ListQuocGia from '@/components/movie/get.quocgia'
import ListNam from '@/components/movie/get.nam'

const Header = () => {
    return (
        <div className='w-full flex h-20 bg-gray-800 text-white items-center justify-around px-4'>
            <Link className='w-3/4 md:w-1/4 flex items-center justify-center' href="/">
                <Image src={movieLogo} alt="Movie App" width={200} height={100} />
            </Link>
            <nav className='ml-auto w-3/4 hidden md:block'>
                <NavigationMenu viewport={false}>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                        <NavigationMenuTrigger className='bg-gray-800'>Thể loại</NavigationMenuTrigger>
                        <NavigationMenuContent className='absolute z-10 w-40 p-2 rounded-md bg-white shadow-md text-black'>
                            <NavigationMenuLink>
                                <ListTheLoai/>
                            </NavigationMenuLink>
                        </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                        <NavigationMenuTrigger className='bg-gray-800'>Quốc gia</NavigationMenuTrigger>
                        <NavigationMenuContent className='absolute z-10 w-40 p-2 rounded-md bg-white shadow-md text-black'>
                          <ListQuocGia/>
                        </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem className='relative'>
                        <NavigationMenuTrigger className='bg-gray-800'>Năm phát hành</NavigationMenuTrigger>
                        <NavigationMenuContent className='absolute z-10 w-40 p-2 rounded-md bg-white shadow-md text-black'>
                           <ListNam/>
                        </NavigationMenuContent>
                        </NavigationMenuItem>
                     </NavigationMenuList>
                </NavigationMenu>
            </nav>
        </div>
    )
}

export default Header