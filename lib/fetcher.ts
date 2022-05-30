export const fetcher = (url: string) => {
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data) {
        return data
      } else {
        return null
      }
    }).catch(null)
}

export const fetcherResults = (url: string) => {
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.results) {
        return data.results
      } else {
        return null
      }
    }).catch(null)
}

export const awaitFetcher = async (url, history = []) => {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ history })
  })
  if (!res.ok) {
    const error : any = new Error('An error occurred while fetching the data.')
    error.info = res.statusText
    error.status = res.status
    throw error
  }
  return res.json()
}
