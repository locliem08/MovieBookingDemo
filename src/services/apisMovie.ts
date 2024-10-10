//Define các function API liên quan đến movie

import { generateMovies } from "../utils/mockData";

//Fake API
export async function getListMovie(record: number) {
    const data = generateMovies(record);
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(data)
        }, 500)
    })
};






