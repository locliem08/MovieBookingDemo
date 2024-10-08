import { Movie } from '../types';

export const generateRandomString = (length: number) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    if (i > 0 && i % 4 === 0) {
      result += ' ';
    }
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result.trim();
};

export const generateMovies = (count: number = 1000): Movie[] => {
  const movies: Movie[] = [];
  for (let i = 1; i <= count; i++) {
    movies.push({
      id: i,
      title: `Phim ${generateRandomString(10)}`,
      description: `Nội dung phim: ${generateRandomString(100)}`,
      thumbnail: `https://picsum.photos/id/${i + 10}/300/500`,
      // thumbnail: `https://picsum.photos/200/300?random=${i}`,
      booked: false,
      favorite: false,
    });
  }
  return movies;
};
