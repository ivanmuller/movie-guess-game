import useStore from 'store/store'

const useNewGame = () => {
  const resetHistory = useStore(state => state.resetHistory)
  const resetLifes = useStore(state => state.resetLifes)
  const resetScore = useStore(state => state.resetScore)

  const runs = () => {
    resetHistory()
    resetLifes()
    resetScore()
    // newMovie()
  }

  return runs
}

export default useNewGame
