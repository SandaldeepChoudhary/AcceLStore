import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import Link from "next/link"

interface PageProps{
    params :{
    productId: string
    }
}

const BREADCRUMBS = [
    {id:1, name: "Home", href: "/"},
    {id:2, name: "Products", href: "/products"},
]
const Page = ({params}: PageProps)=> {
    return <MaxWidthWrapper className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            {/* Product Details */}
            <div className="lg:max-w-lg lg:self-end">
                <ol className="flex items-center space-x-2">
                    {BREADCRUMBS.map((breadcrumb, i)=>(
                        <div className="flex items-center text-sm">
                            <Link href={breadcrumb.href} className="font-medium text-sm text-muted-foreground hover:text-gray-900">
                                {breadcrumb.name}
                            </Link>
                            {i !== BREADCRUMBS.length-1? (
                                <svg
                                viewBox='0 0 20 20'
                                fill='currentColor'
                                aria-hidden='true'
                                className='ml-2 h-5 w-5 flex-shrink-0 text-gray-300'>
                                <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
                            </svg>
                            ): null}
                        </div>
                    ))}
                </ol>
            </div>
        </div>
    </MaxWidthWrapper>

}

export default Page