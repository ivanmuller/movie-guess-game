import useStore from 'store/store'
import settings from 'settings'

const useNewMovie = (mutate : any) => {
  const resetTime = useStore(state => state.resetTime)
  const pauseTime = useStore(state => state.pauseTime)
  const resetAnswer = useStore(state => state.resetAnswer)
  const noSignalON = useStore(state => state.noSignalON)
  const noSignalOFF = useStore(state => state.noSignalOFF)

  const runs = () => {
    resetTime()
    pauseTime()
    noSignalON()
    setTimeout(() => {
      mutate().then(() => {
        resetAnswer()
        setTimeout(() => noSignalOFF(), 100)
        // newMovie()
      })
    }, settings.delayBetweenMovies)
  }

  return runs
}

export default useNewMovie
