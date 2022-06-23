export interface IImageVisor {
  forcedNoSignal: boolean;
  filePath: string;
  filePathAlt: string;
}

export interface IModalResults {
  shaId: string;
  movieOrder: number;
  newMovie: () => void;
}

export interface IAppState {
  score: number;
  lifes: number;
  time: number;
  timeRunning: boolean;
  answerPopupOpened: boolean;
  answer: string | null;
  history: number[];
  noSignal: boolean;
  noSignalON: () => void;
  noSignalOFF: () => void;
  decreaseLifes: () => void;
  decreaseTime: () => void;
  setAnswer: (movieId: string | null) => void;
  resetScore: () => void;
  resetTime: () => void;
  loseTime: (seconds: number) => void;
  playTime: () => void;
  pauseTime: () => void;
  resetLifes: () => void;
  resetAnswer: () => void;
  addHistory: (movieOrder: number) => void;
  resetHistory: () => void;
}
