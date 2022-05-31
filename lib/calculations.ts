export const randomIntFromInterval = (min: number, max: number, excludes: number[]) => { // min and max included
  let r: number = null
  if (max === excludes.length) return
  while (r === null || excludes.includes(r)) {
    r = Math.floor(Math.random() * (max - min + 1) + min)
  }
  return r
}
