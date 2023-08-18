import { useEffect, useState } from 'react'

const useFetch = (url, dependencies = [], shouldFetch = true) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url)
        const data = await res.json()

        setData(data)
      } catch (error) {
        console.log(error)
      }
    }

    if (shouldFetch && !url.includes('undefined')) {
      fetchData()
    }

    if (!shouldFetch) {
      setData(null)
    }
  }, dependencies)

  return { data }
}

export default useFetch
