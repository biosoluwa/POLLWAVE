import path, { extname } from "node:path"
import fs from 'node:fs/promises'
import {sendResponse} from "./sendResponse.js"
import { getContentType } from "./getContentType.js"

export async function serveStatic(req, res, baseDir){
const publicDir = path.join(baseDir, 'public')
const filePath = path.join(publicDir, req.url === '/'? 'create.html': req.url)
const ext = path.extname(filePath)
const contentType = getContentType(ext)
const content = await fs.readFile(filePath)

sendResponse(res, 200, contentType, content)
}