import create from 'zustand'
import settings from 'settings'
import { IAppState } from 'interfaces'

const useStore = create<IAppState>(set => ({
  score: 0,
  lifes: settings.lifes,
  time: settings.time,
  timeRunning: false,
  answerPopupOpened: false,
  answer: null,
  history: [],
  noSignal: false,
  noSignalON: () => set({ noSignal: true }),
  noSignalOFF: () => set({ noSignal: false }),
  decreaseLifes: () => set((state) => ({ lifes: state.lifes - 1 })),
  decreaseTime: () => set((state) => ({ time: state.time - 1 })),
  setAnswer: (movieId) => set({ answer: movieId }),
  resetScore: () => set({ score: 0 }),
  resetTime: () => set({ time: settings.time }),
  playTime: () => set({ timeRunning: true }),
  pauseTime: () => set({ timeRunning: false }),
  resetLifes: () => set({ lifes: settings.lifes }),
  resetAnswer: () => set({ answer: null }),
  addHistory: (movieOrder) => set((state) => ({ history: [...state.history, movieOrder] })),
  resetHistory: () => set(({ history: [] }))
}))

export default useStore
