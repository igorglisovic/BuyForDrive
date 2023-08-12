import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Breadcrumb = () => {
  const pathname = usePathname()
  const breadcrumbString = pathname.split('/').filter(item => item !== '')
  return (
    <div className="mt-2">
      <span className="text-xs">
        <Link href="/">Home page</Link>
      </span>
      <span className="text-xs">
        {breadcrumbString.map(item => (
          <>
            {' '}
            /
            <Link className="capitalize" href={`/${item}`}>
              {' '}
              {item}
            </Link>
          </>
        ))}
      </span>
    </div>
  )
}

export default Breadcrumb
