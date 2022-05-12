import create from 'zustand'
import settings from 'settings'

const useStore = create(set => ({
  score: 0,
  lifes: settings.lifes,
  time: settings.time,
  timeRunning: true,
  answerPopupOpened: false,
  answer: null,
  answered: [],
  decreaseLifes: () => set((state) => ({ lifes: state.lifes - 1 })),
  decreaseTime: () => set((state) => ({ time: state.time - 1 })),
  setAnswer: (movieId) => set((state) => ({ answer: movieId })),
  resetScore: () => set({ score: 0 }),
  resetTime: () => set({ time: settings.time }),
  triggerTime: () => set((state) => ({ timeRunning: !state.timeRunning })),
  resetLifes: () => set({ lifes: settings.lifes }),
  resetAnswer: () => set({ answer: null }),
  addAnswered: () => set((state) => ({ answered: [...state.answered, state.answer] })),
  resetAnswered: () => set(({ answered: [] }))
}))

export default useStore
