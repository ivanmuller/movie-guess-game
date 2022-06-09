import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import settings from 'settings'
import { fetcherResults } from 'lib/fetcher'

const prisma = new PrismaClient()

export default function generateIds (req: NextApiRequest, res: NextApiResponse) {
  // Only WITH SECRET KEY allowed
  const { authorization } = req.headers
  if (authorization !== `Bearer ${process.env.API_SECRET_KEY}`) {
    res.status(401).end('Invalid Token')
    return
  }

  // Only POST allowed
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
    return
  }

  const pages = 25 // 33
  const pagesNumbers = Array.from({ length: pages }, (v, i) => i + 1)

  /*
    Create a MovieDatabase API URL with the pageNumber
    Run a fetch to a page and return a Promise
  */
  const fetchApage = (idPage: number) => {
    return Promise.resolve(fetcherResults(settings.urls.getMovieset1(idPage)))
  }

  /*
    Perform sequential promise calls
  */
  const result = pagesNumbers.reduce(async (previousPromise, nextPromise) => {
    const arr = await previousPromise
    arr.push(await fetchApage(nextPromise))
    return arr
  }, Promise.resolve([]))

  /*
    Get the promise calls
  */
  result.then((response) => {
    /*
      Flatten different pages into an array of movies ids
    */
    let order = 0
    const fullFilledSources = response.reduce((acc, item) => {
      if (item) {
        item.map((i) => {
          order = order + 1
          return acc && acc.push({ order, movieId: i.id })
        })
      }
      return acc
    }, [])
    async function deleteAndUpdateMovieSet () {
      await prisma.movieSetBegginer.deleteMany({})
      await prisma.movieSetBegginer.createMany({
        data: fullFilledSources
      })
    }

    if (fullFilledSources.length > 0) {
      deleteAndUpdateMovieSet().then(() => {
        return res.status(200).json({ message: `${fullFilledSources.length} created` })
      })
    }
  }).catch(error => res.status(404).json({ error: error.toString() }))
}
