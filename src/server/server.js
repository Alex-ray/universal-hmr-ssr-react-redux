import express from 'express';

const PROD = process.env.NODE_ENV === 'production';

const app = express();

if (!PROD) {
  console.log('PROD ::: ', PROD);
}
