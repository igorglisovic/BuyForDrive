import { useEffect, useState } from 'react'

const useMakeUrl = (initialUrl, items, searchParams = null) => {
  const [url, setUrl] = useState('')
  const [paramsArray, setParamsArray] = useState([])

  useEffect(() => {
    let url2 = ''

    items?.forEach(item => {
      if (item?.value) {
        url2 += `&${item?.name}=${item?.value}`
      }
    })

    url2 = initialUrl + url2?.slice(1)

    setUrl(url2)
  }, [items, paramsArray])

  return { url }
}

export default useMakeUrl
