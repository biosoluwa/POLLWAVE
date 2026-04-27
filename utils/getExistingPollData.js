import path from "node:path";
import fs from 'node:fs/promises'

export async function getExistingPollData(){
try{
    const dataPath = path.join('data', 'data.json')
    const data = await fs.readFile(dataPath)
    const existingData = JSON.parse(data)
    return existingData
}catch(err){
    console.error(err)
    return []
}
}