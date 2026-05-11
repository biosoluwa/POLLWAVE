import path from 'node:path'
import fs from 'node:fs/promises'
import { voteUpdateEmitter } from './eventEmitter.js'

export async function updateLiveVote(req,res, queryObj){

    res.statusCode = 200
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('connection', 'keep-alive')

    const filePath = path.join('data', 'data.json')

   
 async function onVoteUpdate(pollId){
        if(pollId !== queryObj.id) return
        let polls = await fs.readFile(filePath)
        polls = JSON.parse(polls)

        const poll = polls.find(function(poll){
            return poll.id === queryObj.id
        })

        res.write(
            `data: ${JSON.stringify({
                event: 'vote-updated',
                poll:poll
            })}\n\n`
        )
}
    voteUpdateEmitter.on('voteUpdate', onVoteUpdate)
    res.on('close', function(){
        voteUpdateEmitter.removeListener('voteUpdate', onVoteUpdate)
    })
}