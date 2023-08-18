const useMakeUrl = (initialUrl, items) => {
  let url = initialUrl

  items?.forEach(item => {
    if (url !== initialUrl && item.value) {
      url += '&'
    }

    if (item?.value && !url.includes(item?.name)) {
      url += `${item?.name}=${item?.value}`
    }
  })

  return { url }
}

export default useMakeUrl
