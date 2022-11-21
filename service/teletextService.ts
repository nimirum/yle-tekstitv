
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const TELETEXT_API_URL = process.env.TELETEXT_API_URL;
const ID = process.env.APP_ID;
const APP_KEY = process.env.APP_KEY;

export function getTeletextPageImage(page:number, subpage:number) {
    return fetchImage(TELETEXT_API_URL + "images/" + page + "/" + subpage + ".png?app_id="+ID+"&app_key="+APP_KEY)
}

export function getTeletextPageData(page:number) {
    return fetchJson(TELETEXT_API_URL + "pages/" + page + ".json?app_id="+ID+"&app_key="+APP_KEY)
}

async function fetchImage(endpoint:string) {
   try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`HTTP error, status = ${response.status}`);
        }
        const contentType = response.headers.get("Content-Type");
        const buffer = await response.buffer(); //FIX: deprecated method
        return bufferToBase64(buffer, contentType)
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

async function bufferToBase64(buffer:Buffer, contentType:string|null) {
    return "data:" + contentType + ';base64,' + buffer.toString('base64');
  };
