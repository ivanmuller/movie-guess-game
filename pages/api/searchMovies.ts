import type { NextApiRequest, NextApiResponse } from 'next'
import settings from 'settings'
import { fetcher } from 'lib/fetcher'

export default async function getMovie (req: NextApiRequest, res: NextApiResponse) {
  if (!req.query.query) {
    return res.status(404).json({ error: 'Not value for query' })
  }

  const inputValue = req.query.query
  const urlToFetch = settings.urls.searchMovies(inputValue)

  const promises = []
  promises.push(fetcher(urlToFetch))
  // add more push of fetcher if needed

  Promise.allSettled(promises)
    .then(response => {
      /*
        Cleaning Results
      */
      const fullFilledSources = response.reduce((acc, item) => {
        if (item.status !== 'fulfilled') {
          return null
        }
        return ({ ...acc, ...item.value })
      }, [])

      return res.status(200).json({ ...fullFilledSources })
    }).catch(error => res.status(404).json({ error: error.toString() }))
}
