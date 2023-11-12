import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Breadcrumb = ({ items = false }) => {
  const pathname = usePathname()
  const breadcrumbString = pathname.split('/').filter(item => item !== '')
  console.log(items)
  return (
    <div className="mt-2 flex gap-1">
      <span className="text-xs">
        <Link href="/">Home page</Link>
      </span>
      <span className="text-xs flex gap-1">
        {!items.length
          ? breadcrumbString.map((item, i) => (
              <div className="" key={i}>
                {' '}
                /<span className="capitalize"> {item}</span>
              </div>
            ))
          : items?.map((item, i) => (
              <div className="" key={i}>
                {' '}
                /
                {item.link ? (
                  <Link href={item.link} className="capitalize">
                    {' '}
                    {item.label}
                  </Link>
                ) : (
                  <span className="capitalize"> {item.label}</span>
                )}
              </div>
            ))}
      </span>
    </div>
  )
}

export default Breadcrumb
