import { Request, Response } from 'express';
import * as TeletextService from '../service/teletextService.js';

// GET '/v1/teletext/:page/:subpage'
export function getTeletextPageImage(req:Request, res:Response) {
    const promise = TeletextService.getTeletextPageImage(+req.params.page, +req.params.subpage)
    //FIX: Image is not working
    promise.then(value => 
        res.end(
            '<html>'+
            '<head></head>'+
            '<body>'+
                '<img src="'+value+'">'+
            '</body>'+
            '</html>'
        ))
};

// GET '/v1/data/:page/'
export function getTeletextPageData(req:Request, res:Response) {
    const promise = TeletextService.getTeletextPageData(+req.params.page)
    promise.then(value => res.end(value))
};