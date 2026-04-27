import http from 'node:http'
import { serveStatic } from './utils/serveStatic.js'
import { handlePostRequest } from './handlers/routeHandlers.js'

const PORT = 8000
const __dirname = import.meta.dirname

const server = http.createServer(async(req,res)=>{
    if(req.url === '/poll'){
        if(req.method === 'POST'){
           await handlePostRequest(req,res)
        }else if(req.method === 'GET'){

        }
    }else if(!req.url.startsWith('/poll')){
        await serveStatic(req, res, __dirname)
    }
})

server.listen(PORT, ()=>{console.log('connected on port:', PORT)})