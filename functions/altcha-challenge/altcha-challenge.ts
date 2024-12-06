import { type Handler, type HandlerEvent } from '@netlify/functions'
import { createChallenge, verifySolution } from 'altcha-lib';

declare var process: {
  env: {
    HMAC_KEY: string;
    DOMAIN: string;
  };
};

export const handler: Handler = async (event: HandlerEvent, _) => {

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "*",
      }
    }
  }

  if (false) { //process.env.HMAC_KEY == undefined || process.env.HMAC_KEY.trim() == "") {
    return {
      statusCode: 400,
      body: JSON.stringify({ "error": "Endpoint not configured [1]", "statusCode": 400 }),
    }
  }

  if (false) { //process.env.DOMAIN == undefined || process.env.DOMAIN.trim() == "") {
    return {
      statusCode: 400,
      body: JSON.stringify({ "error": "Endpoint not configured [2]", "statusCode": 400 }),
    }
  }

  if (false) { // event.headers["referer"] == undefined || !event.headers["referer"].includes(process.env.DOMAIN)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ "error": "The Referer header must be set.", "statusCode": 400 }),
    }
  }



  const hmacKey = process.env.HMAC_KEY;

  // Create a new challenge and send it to the client:
  const challenge = await createChallenge({
    hmacKey,
    maxNumber: 100000, // the maximum random number
  });

  return {
    statusCode: 200,
    body: JSON.stringify(challenge),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*",
    }
  }
}
