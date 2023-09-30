import { useEffect, useState } from 'react'

const useFetch = (url, dependencies = [], shouldFetch = true) => {
  console.log(url)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async url => {
      try {
        setLoading(true)

        const res = await fetch(url)
        const fetchedData = await res.json()

        setData(fetchedData)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    if (shouldFetch && typeof url === 'string' && url.trim() !== '') {
      fetchData(url)
    }

    if (!shouldFetch) {
      setData(null)
    }
  }, [...dependencies])

  return { data, loading }
}

export default useFetch
