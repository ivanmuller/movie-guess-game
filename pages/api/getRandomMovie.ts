import settings from 'settings'
import { fetcher } from 'lib/fetcher'
import { encrypt } from 'lib/encryption'
import { randomIntFromInterval } from 'lib/calculations'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function getRandomMovie (req, res) {
  const alreadyAnswered = req.query.ids || []
  /*
    Getting a random Id from the database
  */
  async function getRandomId () {
    const moviesCount = await prisma.MovieSetBegginer.count()
    const randomMovie = await prisma.MovieSetBegginer.findMany({
      where: {
        order: randomIntFromInterval(1, moviesCount)
      }
    })
    return randomMovie[0].movieId
  }

  const movieId = await getRandomId()
  const urlForImages = settings.urls.getImages(movieId)

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
        Calling first backdrop
      */
      let { id, backdrops } = fullFilledSources
      id = encrypt(id.toString())
      const filePath = backdrops[0].file_path
      const filePathAlt = backdrops[1].file_path
      return res.status(200).json({ id, filePath, filePathAlt })
    }).catch(error => res.status(404).json({ error: error.toString() }))
}
