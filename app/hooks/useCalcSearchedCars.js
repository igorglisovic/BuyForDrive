import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchContext } from '@app/store/search-car'

const makeUrl = (initialUrl, items, searchParams = null) => {
  let paramsArray = []
  let url = ''

  if (searchParams) {
    const makeParamsArray = Object.keys(searchParams).map(key => ({
      name: key,
      value: searchParams[key],
    }))

    paramsArray = makeParamsArray
  }

  if (paramsArray.length && !items.length) {
    items = paramsArray
  }

  items?.forEach(item => {
    if (item?.value) {
      url += `&${item?.name}=${item?.value}`
    }
  })

  // e.g. "/cars/search?" + "sort=...&brand=..."
  url = initialUrl + url?.slice(1)

  if (paramsArray.length) {
    return { url, paramsArray }
  } else {
    return url
  }
}

const fetchSearchedCars = async url => {
  try {
    const res = await fetch(url)
    const data = await res.json()

    return data
  } catch (error) {
    console.log(error)
  }
}

const useCalcSearchedCars = () => {
  const [countOffers, setCountOffers] = useState()
  const [queriesArray, setQueriesArray] = useState()
  const [apiUrl, setApiUrl] = useState('')
  const [routeUrl, setRouteUrl] = useState('')

  const router = useRouter()

  const {
    brand,
    model,
    yearFrom,
    yearTo,
    bodyType,
    fuelType,
    sorting,
    page,
    limit,
    priceFrom,
    priceTo,
    mileageFrom,
    mileageTo,
    powerFrom,
    powerTo,
  } = useSearchContext()

  useEffect(() => {
    setQueriesArray([
      { name: 'sort', value: sorting },
      { name: 'page', value: page },
      { name: 'limit', value: limit },
      { name: 'brand_id', value: brand?._id },
      { name: 'model_id', value: model?._id },
      {
        name: 'year_from',
        value: yearFrom?._id && `${yearFrom?._id}_${yearFrom?.label}`,
      },
      {
        name: 'year_to',
        value: yearTo?._id && `${yearTo?._id}_${yearTo?.label}`,
      },
      { name: 'body_type_id', value: bodyType?._id },
      { name: 'fuel_type_id', value: fuelType?._id },
      {
        name: 'price_from',
        value:
          priceFrom?._id &&
          `${priceFrom?._id}_${priceFrom?.label.split(' ')[0]}`,
      },
      {
        name: 'price_to',
        value:
          priceTo?._id && `${priceTo?._id}_${priceTo?.label.split(' ')[0]}`,
      },
      {
        name: 'mileage_from',
        value:
          mileageFrom?._id &&
          `${mileageFrom?._id}_${mileageFrom?.label.split(' ')[0]}`,
      },
      {
        name: 'mileage_to',
        value:
          mileageTo?._id &&
          `${mileageTo?._id}_${mileageTo?.label.split(' ')[0]}`,
      },
      {
        name: 'power_from',
        value:
          powerFrom?._id &&
          `${powerFrom?._id}_${powerFrom?.label
            .split(' ')[0]
            .replace('kW', '')}`,
      },
      {
        name: 'power_to',
        value:
          powerTo?._id &&
          `${powerTo?._id}_${powerTo?.label.split(' ')[0].replace('kW', '')}`,
      },
    ])
  }, [
    brand,
    model,
    yearFrom,
    yearTo,
    bodyType,
    fuelType,
    sorting,
    page,
    limit,
    priceFrom,
    priceTo,
    mileageFrom,
    mileageTo,
    powerFrom,
    powerTo,
  ])

  useEffect(() => {
    const routeUrlValue = makeUrl('/cars/search?', queriesArray)
    const apiUrlValue = makeUrl('/api/searched_cars?', queriesArray)

    setApiUrl(apiUrlValue)
    setRouteUrl(routeUrlValue)
  }, [queriesArray])

  // Count number of searched cars
  useEffect(() => {
    const fetchSearchedCarsData = async () => {
      const urlWithoutPageAndLimit = apiUrl
        .split('&')
        .filter(
          param => !param.startsWith('page=') && !param.startsWith('limit=')
        )
        .join('&')

      const data = await fetchSearchedCars(urlWithoutPageAndLimit)

      setCountOffers(data?.length)
    }

    if (
      brand ||
      model ||
      yearFrom ||
      yearTo ||
      bodyType ||
      fuelType ||
      priceFrom ||
      priceTo ||
      mileageFrom ||
      mileageTo ||
      powerFrom ||
      powerTo
    ) {
      fetchSearchedCarsData()
    }
  }, [apiUrl])

  // Count number of all cars
  useEffect(() => {
    const countNumOfAllOffers = async () => {
      const allCars = await fetchSearchedCars('/api/searched_cars?')

      setCountOffers(allCars?.length)
    }
    if (
      !brand &&
      !model &&
      !yearFrom &&
      !yearTo &&
      !bodyType &&
      !fuelType &&
      !priceFrom &&
      !priceTo &&
      !mileageFrom &&
      !mileageTo &&
      !powerFrom &&
      !powerTo
    )
      countNumOfAllOffers()
  }, [
    brand,
    model,
    yearFrom,
    yearTo,
    bodyType,
    fuelType,
    priceFrom,
    priceTo,
    mileageFrom,
    mileageTo,
    powerFrom,
    powerTo,
  ])

  // Handle form submition
  const handleSubmit = e => {
    e.preventDefault()

    router.push(routeUrl)
  }

  // Disable submitting form on clicking 'Enter' hotkey
  const handleKeyDown = e => {
    if (e.keyCode === 13 && document.activeElement.tagName !== 'BUTTON') {
      e.preventDefault()
    }
  }

  return { countOffers, handleSubmit, handleKeyDown, routeUrl }
}

export default useCalcSearchedCars
