import fs from "node:fs/promises"
import path from 'node:path'

async function filterThroughPolls(voteData){
    const filePath = path.join('data', 'data.json')
    const allPolls = await fs.readFile(filePath)

   let poll = allPolls.filter(function(poll){
        return poll.id === voteData.id
    })[0]
    console.log(poll)
}