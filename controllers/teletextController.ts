import { Request, Response } from 'express';
import * as TeletextService from '../service/teletextService.js';

// GET '/v1/teletext/:page/:subpage'
export function getTeletextPageImage(req:Request, res:Response) {
    TeletextService.getTeletextPageImage(+req.params.page, +req.params.subpage, req?.query?.time)
    .then(imageb64 => 
        res.end(
            '<html>'+
            '<head></head>'+
            '<body>'+
                '<img src="'+imageb64+'">'+
            '</body>'+
            '</html>'
        ))
};

// GET '/v1/data/:page/'
export function getTeletextPageData(req:Request, res:Response) {
    TeletextService.getTeletextPageData(+req.params.page)
    .then(json => res.end(json))
};