import http from 'node:http'
import { serveStatic } from './utils/serveStatic.js'
import {handleGetRequest, handlePostRequest, handleVotePostRequest } from './handlers/routeHandlers.js'
import { updateLiveVote } from './events/updateLiveVote.js'

const PORT = 8000
const __dirname = import.meta.dirname

const server = http.createServer(async(req,res)=>{
    if(req.url.startsWith('/polls')){
        if(req.method === 'POST'){
           await handlePostRequest(req,res)
        }else if(req.method === 'GET'){
            const urlObj = new URL(req.url, `http://${req.headers.host}`)
            const queryObj = Object.fromEntries(urlObj.searchParams)
            await handleGetRequest(req, res, queryObj)
        }
    }else if(req.url.startsWith('/vote/live')){
        const urlObj = new URL(req.url, `http://${req.headers.host}`)
        const queryObj = Object.fromEntries(urlObj.searchParams)
        updateLiveVote(req,res, queryObj)
    }else if(req.url.startsWith('/vote')){
        handleVotePostRequest(req, res)
    }else{
        await serveStatic(req, res, __dirname)
    }
})

server.listen(PORT, ()=>{console.log('connected on port:', PORT)})