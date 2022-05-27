import create from 'zustand'
import settings from 'settings'
import { AppState } from 'types'

const useStore = create<AppState>(set => ({
  score: 0,
  lifes: settings.lifes,
  time: settings.time,
  timeRunning: true,
  answerPopupOpened: false,
  answer: null,
  history: [],
  decreaseLifes: () => set((state) => ({ lifes: state.lifes - 1 })),
  decreaseTime: () => set((state) => ({ time: state.time - 1 })),
  setAnswer: (movieId) => set({ answer: movieId }),
  resetScore: () => set({ score: 0 }),
  resetTime: () => set({ time: settings.time }),
  triggerTime: () => set((state) => ({ timeRunning: !state.timeRunning })),
  resetLifes: () => set({ lifes: settings.lifes }),
  resetAnswer: () => set({ answer: null }),
  addHistory: (movieOrder) => set((state) => ({ history: [...state.history, movieOrder] })),
  resetHistory: () => set(({ history: [] }))
}))

export default useStore
