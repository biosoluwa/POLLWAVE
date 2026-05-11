import path from 'node:path'
import fs from 'node:fs/promises'
import { voteUpdateEmitter } from './eventEmitter.js'

export async function updateLiveVote(req,res, queryObj){

    res.statusCode = 200
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('connection', 'keep-alive')

    const filePath = path.join('data', 'data.json')
    let polls = await fs.readFile(filePath)
    polls = JSON.parse(polls)

    const poll = polls.filter(function(poll){
        return poll.id === queryObj.id
    })

    voteUpdateEmitter.on('voteUpdate', function(poll){
    res.write(
        `data: ${JSON.stringify({
            event: 'vote-updated',
            poll:poll
        })}\n\n`
    )
})
}