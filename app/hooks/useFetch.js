import { useEffect, useState } from 'react'

const useFetch = (url, dependencies = [], shouldFetch = true) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  // console.log(url)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const res = await fetch(url)
        const data = await res.json()

        setData(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    if (shouldFetch && !url.includes('undefined')) {
      fetchData()
    }

    if (!shouldFetch) {
      setData(null)
    }
  }, dependencies)

  return { data, loading }
}

export default useFetch
