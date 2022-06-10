# 📽 Movie Guess Game
A game to guess movies from different shot scenes, with score, countdown time and lifes. 
Work in progress...

[Project URL ](https://movie-guess-game.vercel.app/)

[![screenshot](http://ivanmuller.me/images/movie-guess-game.jpg)](https://movie-guess-game.vercel.app/)
### ▶ How to play
- Once the movie is being shown, you have **20 seconds** to write the right answer. 
- An **autossugest** field will help you.
- Your **score** is based on the time left, so the fast you are, the points you earn.
- At half time, you will get a new picture of the same movie.
- You have **3 lifes** to accumulate points.
- TIP 1: just use your keyboard. Auto-focus will help you to be faster.

### 🧱 How it works
- Thanks to [TMDB](https://www.themoviedb.org/), I generate a set of movies and save them in a database. This is our **Set to Play**.
- The **Set** is basically a group of movies from 1980 sorted by vote average. This will update every week automatically.
- From that **Set**, the app is showing two backdrops from a random movie.

## Ideas of new features to add
- [ ] Modal styles improvements
- [ ] Game Over with stats and optional saving of name
- [ ] Share results
- [ ] Leaderboard
- [ ] More **Sets** with different difficulty level
- [ ] A **TV Series** version

## Stack
- **Framework**: [Next.js](https://nextjs.org/)
- **Main Language:** [Typescript](https://www.typescriptlang.org/)
- **Database**: [PlanetScale](https://planetscale.com/)
- **ORM**: [Prisma](https://prisma.io/)
- **Styling**: [Chakra-UI](https://chakra-ui.com/)
- **State Management:** [Zustand](https://zustand.surge.sh/)
- **Automation**: [GitHub Actions](https://github.com/features/actions)
- **Deployment**: [Vercel](https://vercel.com)

## Run it locally

1) Clone or download the main folder structure.
2) Run `npm install`.
3) Configure Prisma with Planetscale.
4) Run `npm run dev`.
5) Run /api/generateIds