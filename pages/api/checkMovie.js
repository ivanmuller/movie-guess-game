import { encrypt } from 'lib/encryption'

export default function handler(req, res) {
  if (!req.query.id) {
    return res.status(404).json({ error: 'Missing Movie ID' })
  }

  const encriptedMovieId = encrypt(req.query.id)
  res.status(200).json({ encriptedMovieId })
}
