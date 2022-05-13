import settings from 'settings'
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetcherResults } from 'lib/fetcher'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default function generateIds (req: NextApiRequest, res: NextApiResponse) {
  const pages = 15
  const realPagesUseItLater = 33
  const pagesNumbers = Array.from({ length: pages }, (v, i) => i + 1)

  /*
    Create a MovieDatabase API URL with the pageNumber
    Run a fetch to a page and return a Promise
  */
  const fetchApage = (idPage) => {
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
      await prisma.MovieSetBegginer.deleteMany({})
      await prisma.MovieSetBegginer.createMany({
        data: fullFilledSources
      })
    }

    if (fullFilledSources.length > 0) {
      deleteAndUpdateMovieSet().then(() => {
        return res.status(200).json({ message: "done" })
      })
    }
  }).catch(error => res.status(404).json({ error: error.toString() }))
}
