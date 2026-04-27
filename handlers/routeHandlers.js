import { collectIncomingPollData } from "../utils/collectIncomingPollData.js";
import { sendResponse } from "../utils/sendResponse.js";
import { addNewDataToExistingData } from "../utils/addNewDataToExistingData.js";

export async function handlePostRequest(req, res){
    const pollData = await collectIncomingPollData(req)
    addNewDataToExistingData(pollData)
    sendResponse(res, 201, 'application/json', JSON.stringify(pollData))
}