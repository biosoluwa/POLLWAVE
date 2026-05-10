import path, { extname } from "node:path"
import fs from 'node:fs/promises'
import {sendResponse} from "./sendResponse.js"
import { getContentType } from "./getContentType.js"

export async function serveStatic(req, res, baseDir){
    const publicDir = path.join(baseDir, 'public')
    const parsedUrl = new URL(req.url, 'http://localhost')
    const pathname = parsedUrl.pathname
    const filePath = path.join(publicDir, pathname === '/'? 'create.html': pathname)
    const ext = path.extname(filePath)
    const contentType = getContentType(ext)

    try{
        const content = await fs.readFile(filePath)
        sendResponse(res, 200, contentType, content)

    }catch(err){
        if(err.code === 'ENOENT'){
            sendResponse(res, 404, 'text/html', `Resource not found:${err}`)
        }else{
            sendResponse(res, 500, 'text/html', 'server error')
        }
    }
}