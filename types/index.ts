export interface ImageVisorProps {
  filePath: string;
  filePathAlt: string;
}

export interface ModalResultsProps {
  shaId: string;
  loseLife: () => void;
  newMovie: () => void;
}

export interface AppState {
  score: number;
  lifes: number;
  time: number;
  timeRunning: boolean;
  answerPopupOpened: boolean
  answer: string | null
  answered: string[]
  decreaseLifes: () => void
  decreaseTime: () => void
  setAnswer: (movieId: string | null) => void
  resetScore: () => void
  resetTime: () => void
  triggerTime: () => void
  resetLifes: () => void
  resetAnswer: () => void
  addAnswered: () => void
  resetAnswered: () => void
}