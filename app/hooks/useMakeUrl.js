import { useEffect, useState } from 'react'

const useMakeUrl = (initialUrl, items, searchParams = null) => {
  const [url, setUrl] = useState('')
  const [paramsArray, setParamsArray] = useState([])

  // useEffect(() => {
  //   if (searchParams) {
  //     const makeParamsArray = Object.keys(searchParams).map(key => ({
  //       name: key,
  //       value: searchParams[key],
  //     }))

  //     setParamsArray(makeParamsArray)
  //   }
  // }, [searchParams])

  useEffect(() => {
    let url2 = ''

    // if (paramsArray.length && !items) {
    // if (paramsArray.length && !items.length) {
    //   items = paramsArray
    // }

    items?.forEach(item => {
      if (item?.value) {
        url2 += `&${item?.name}=${item?.value}`
      }
    })

    // e.g. "/cars/search?" + "sort=...&brand=..."
    url2 = initialUrl + url2?.slice(1)

    // console.log('url2 ', url2)

    console.log('items: ', items)
    console.log('paramsArray: ', paramsArray)
    console.log('url2 ', url) // Ensure that the correct URL is logged
    setUrl(url2)
  }, [items, paramsArray])

  useEffect(() => {
    console.log('url2 ', url)
  }, [url])

  // if (paramsArray.length) {
  //   return { url, paramsArray }
  // } else {
  return { url }
  // }
}

export default useMakeUrl
