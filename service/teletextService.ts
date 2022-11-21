
import dotenv from 'dotenv';
import * as fs from 'fs';
import fetch from 'node-fetch';

dotenv.config();

const TELETEXT_API_URL = process.env.TELETEXT_API_URL;
const ID = process.env.APP_ID;
const APP_KEY = process.env.APP_KEY;

export function getSubpage(page:number, subpage:number) {
    return fetchImage(TELETEXT_API_URL + "images/" + page + "/" + subpage + ".png?app_id="+ID+"&app_key="+APP_KEY)
}

export function getPageData(page:number) {
    return fetchJson(TELETEXT_API_URL + "pages/" + page + ".json?app_id="+ID+"&app_key="+APP_KEY)
}

async function fetchImage(endpoint:string) {
   try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`HTTP error, status = ${response.status}`);
        }
        // DEBUG: saving png file is succesfull?
        response?.body?.pipe(fs.createWriteStream('response.png'))

        const blob = await response.blob();
        return blobToBase64(blob)
    } catch (err) {
        console.log("Unable to fetch", err);
    }
}

async function fetchJson(endpoint:string) {
    try {
         const response = await fetch(endpoint);
         if (!response.ok) {
             throw new Error(`HTTP error, status = ${response.status}`);
         }
         const blob = await response.blob();
         return await blob.text()
     } catch (err) {
         console.log("Unable to fetch", err);
     }
 }

async function blobToBase64(blob:Blob) {
    const buffer = Buffer.from(await blob.text());
    return "data:" + blob.type + ';base64,' + buffer.toString('base64');
  };
