import useStore from 'store/store'
import useNewGame from 'controllers/useNewGame'

const useLoseLife = () => {
  const decreaseLifes = useStore(state => state.decreaseLifes)
  const lifes = useStore(state => state.lifes)
  const newGame = useNewGame()

  const runs = () => {
    decreaseLifes()
    if (lifes === 1) {
      newGame()
    }
  }

  return runs
}

export default useLoseLife
