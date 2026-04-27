import path from "node:path";
import fs from 'node:fs/promises'

export async function getExistingPollData(){
try{
    const dataPath = path.join('data', 'data.json')
    const existingData = JSON.parse(await fs.readFile(dataPath))
    return existingData
}catch(err){
    console.error(err)
    return []
}
}