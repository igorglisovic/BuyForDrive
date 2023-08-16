import { useEffect, useState } from 'react'

const useFetch = (url, dependencies, statement) => {
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

    if (statement && !url.includes('undefined')) {
      fetchData()
    }

    if (!statement) {
      setData(null)
    }
  }, dependencies)

  return { data }
}

export default useFetch
