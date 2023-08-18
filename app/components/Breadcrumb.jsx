import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Breadcrumb = () => {
  const pathname = usePathname()
  const breadcrumbString = pathname.split('/').filter(item => item !== '')
  return (
    <div className="mt-2 flex gap-1">
      <span className="text-xs">
        <Link href="/">Home page</Link>
      </span>
      <span className="text-xs flex gap-1">
        {breadcrumbString.map((item, i) => (
          <div className="" key={i}>
            {' '}
            /
            <Link className="capitalize" href={`/${item}`}>
              {' '}
              {item}
            </Link>
          </div>
        ))}
      </span>
    </div>
  )
}

export default Breadcrumb
