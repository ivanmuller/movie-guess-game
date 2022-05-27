export const randomIntFromInterval = (min: number, max: number, excludes: []) => { // min and max included
  let r = null
  if (max === excludes.length) return
  while (r === null || excludes.includes(r)) {
    r = Math.floor(Math.random() * (max - min + 1) + min)
  }
  return r
}
