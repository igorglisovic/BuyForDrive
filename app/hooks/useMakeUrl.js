import { useEffect, useState } from 'react'

const useMakeUrl = (initialUrl, items, searchParams = null) => {
  const [url, setUrl] = useState('')
  const [paramsArray, setParamsArray] = useState([])

  useEffect(() => {
    if (searchParams) {
      const makeParamsArray = Object.keys(searchParams).map(key => ({
        name: key,
        value: searchParams[key],
      }))

      setParamsArray(makeParamsArray)
    }
  }, [searchParams])

  useEffect(() => {
    let url2 = ''

    if (paramsArray.length && !items) {
      items = paramsArray
    }

    items?.forEach(item => {
      if (item?.value) {
        url2 += `&${item?.name}=${item?.value}`
      }
    })

    // e.g. "/cars/search?" + "sort=...&brand=..."
    url2 = initialUrl + url2?.slice(1)

    console.log('updated to ', url2)
    setUrl(url2)
  }, [items, paramsArray])

  useEffect(() => {
    console.log('url je ', url)
  }, [url])

  if (paramsArray.length) {
    return { url, paramsArray }
  } else {
    return { url }
  }
}

export default useMakeUrl
