import settings from 'settings'
import { fetcher } from 'lib/fetcher'
import { encrypt } from 'lib/encryption'
import { randomIntFromInterval } from 'lib/calculations'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function getRandomMovie (req, res) {
  const history = req.body.history?.map(e => parseFloat(e)) || []

  /*
   * Getting a random Id from the database, taking into account the already history movies.
   * First we need to check how many rows we have in total,
   * then we can get a random order id based in the minumun, maximum, and already history
  */
  async function getRandomId () {
    const moviesCount = await prisma.MovieSetBegginer.count()
    if (moviesCount > history.length) {
      const randomMovie = await prisma.MovieSetBegginer.findMany({
        where: {
          order: randomIntFromInterval(1, moviesCount, history)
        }
      })
      const { movieId, order } = randomMovie[0]
      return { movieId, order }
    } else {
      return null
    }
  }

  /*
   * With a random movieId, get the movie Info
   */
  const randomMovie = await getRandomId()
  if (!randomMovie?.movieId) {
    return res.status(200).json({ message: 'No more movies left' })
  }
  const urlForImages = settings.urls.getImages(randomMovie.movieId)

  const promises = []
  promises.push(fetcher(urlForImages))
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

      /*
        Getting an ecrypted id
        Calling first two backdrops
      */
      let { id, backdrops } = fullFilledSources
      id = encrypt(id.toString())
      const filePath = backdrops[0].file_path
      const filePathAlt = backdrops[1].file_path
      return res.status(200).json({ id, filePath, filePathAlt, order: randomMovie.order })
    }).catch(error => res.status(404).json({ error: error.toString() }))
}
