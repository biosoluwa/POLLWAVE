import { collectIncomingPollData } from "../utils/collectIncomingPollData.js";
import { sendResponse } from "../utils/sendResponse.js";

export async function handlePostRequest(req, res){
    const pollData = await collectIncomingPollData(req)
    sendResponse(res, 201, 'application/json', JSON.stringify(pollData))
}