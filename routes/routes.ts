import express from 'express';
import * as TeletextController from '../controllers/teletextController.js'; 

export const router  = express.Router(); 

router.get('/v1/teletext/:page/:subpage', TeletextController.getTeletextPageImage);

router.get('/v1/data/:page', TeletextController.getTeletextPageData);