import express from 'express';
//import { transactions, movieReviews, movieDetails } from './moviesData';

const router = express.Router(); 
router.get('/', (req, res) => {
    res.json(movies);
});

export default router;