import { type Handler, type HandlerEvent } from "@netlify/functions";
import {
  EmailClient,
  type EmailMessage,
  type EmailSendResponse,
} from "@azure/communication-email";
import { verifySolution } from "altcha-lib";

interface ContactForm {
  firstName: string;
  lastName?: string;
  email: string;
  topic: string;
  subject: string;
  message: string;
  altcha: string;
}

declare var process: {
  env: {
    EMAIL_CONNECTION_STRING: string;
    EMAIL_SENDER: string;
    DOMAIN: string;
    HMAC_KEY: string;
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

  if(!event.body) {
    return errorResponse("No request body")
  }

  const form:ContactForm = JSON.parse(event.body);

  if (
    process.env.EMAIL_CONNECTION_STRING == undefined ||
    process.env.EMAIL_CONNECTION_STRING.trim() == ""
  ) {
    return errorResponse("Endpoint not configured [1]")
  }

  if (
    process.env.EMAIL_SENDER == undefined ||
    process.env.EMAIL_SENDER.trim() == ""
  ) {
    return errorResponse("Endpoint not configured [2]")
  }

  if (process.env.DOMAIN == undefined || process.env.DOMAIN.trim() == "") {
    return errorResponse("Endpoint not configured [3]")
  }

  if (
    event.headers["referer"] == undefined ||
    !event.headers["referer"].includes(process.env.DOMAIN)
  ) {
    return errorResponse("The Referer header must be set and match.")
  }


    try{
      const hmacKey = process.env.HMAC_KEY;
      console.log(form.altcha)
      const ok = await verifySolution(form.altcha, hmacKey);
    
      if(!ok){
        return errorResponse("Bot detected");
      }
    } catch(error){
      console.log(error);
      return errorResponse("Bot detected");
    }

  if (
    isInvalid(form.firstName) ||
    isInvalid(form.email) ||
    isInvalid(form.topic) ||
    isInvalid(form.subject) ||
    isInvalid(form.message)
  ) {
    return errorResponse("Form content invalid.");
  }

  const sent = await sendEmail(
    form,
    process.env.EMAIL_CONNECTION_STRING,
    process.env.EMAIL_SENDER,
  );

  if (!sent) {
    return errorResponse("Unable to send");
  }

  return successResponse();
};

async function sendEmail(
  form: ContactForm,
  EMAIL_CONNECTION_STRING: string,
  EMAIL_SENDER: string,
) {
  const client = new EmailClient(EMAIL_CONNECTION_STRING);

  let subject = form.topic == "uniform-request" ? `Uniform Request (${form.subject})`: `New Website Enquiry (${form.subject})`;

  const message: EmailMessage = {
    senderAddress: EMAIL_SENDER,
    content: {
      subject: subject,
      html: emailBody(form),
    },
    recipients: {
      to: [{
        address: `${form.topic}@1stchertseyscoutgroup.com`
      }],
      bcc: [{
        address:"timjcane@gmail.com"
      }],
    },
  };

  const poller = await client.beginSend(message);
  const response: EmailSendResponse = await poller.pollUntilDone();

  switch (response.status) {
    case "NotStarted":
    case "Running":
    case "Failed":
    case "Canceled":
      return false;
    case "Succeeded":
      return true;
    default:
      throw new Error("Unknown status");
  }
}

function errorResponse(message: string) {
  return {
    statusCode: 400,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*",
    },
    body: JSON.stringify({ "error": message, "statusCode": 400 }),
  };
}

function successResponse() {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*",
    },
    body: JSON.stringify(true)
  };
}

function isInvalid(str: string | undefined | null): boolean {
  return str == undefined || str == null || str.trim() == "";
}

function emailBody({ email, message, firstName, lastName, subject }: ContactForm) {
  return `
  <!doctype html>
<html>
  <body>
    <div
      style='background-color:#F0ECE5;color:#262626;font-family:"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0.15008px;line-height:1.5;margin:0;padding:32px 0;min-height:100%;width:100%'
    >
      <table
        align="center"
        width="100%"
        style="margin:0 auto;max-width:600px;background-color:#FFFFFF;border-radius:4px"
        role="presentation"
        cellspacing="0"
        cellpadding="0"
        border="0"
      >
        <tbody>
          <tr style="width:100%">
            <td>
              <h1
                style="font-weight:bold;text-align:center;margin:0;font-size:32px;padding:16px 24px 16px 24px"
              >
                New Website Enquiry
              </h1>
              <div style="padding:16px 0px 16px 0px">
                <hr
                  style="width:100%;border:none;border-top:1px solid #CCCCCC;margin:0"
                />
              </div>
              <div style="padding:16px 24px 16px 24px">
                <table
                  align="center"
                  width="100%"
                  cellpadding="0"
                  border="0"
                  style="table-layout:fixed;border-collapse:collapse"
                >
                  <tbody style="width:100%">
                    <tr style="width:100%">
                      <td
                        style="box-sizing:content-box;vertical-align:top;padding-left:0;padding-right:8px;width:150px"
                      >
                        <h3
                          style="font-weight:bold;text-align:right;margin:0;font-size:20px;padding:16px 24px 16px 24px"
                        >
                          Name:
                        </h3>
                      </td>
                      <td
                        style="box-sizing:content-box;vertical-align:top;padding-left:8px;padding-right:0"
                      >
                        <div
                          style="background-color:#FAFAFA;font-weight:normal;padding:16px 24px 16px 24px"
                        >
                        ${firstName} ${lastName}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style="padding:16px 24px 16px 24px">
                <table
                  align="center"
                  width="100%"
                  cellpadding="0"
                  border="0"
                  style="table-layout:fixed;border-collapse:collapse"
                >
                  <tbody style="width:100%">
                    <tr style="width:100%">
                      <td
                        style="box-sizing:content-box;vertical-align:top;padding-left:0;padding-right:8px;width:150px"
                      >
                        <h3
                          style="font-weight:bold;text-align:right;margin:0;font-size:20px;padding:16px 24px 16px 24px"
                        >
                          Email:
                        </h3>
                      </td>
                      <td
                        style="box-sizing:content-box;vertical-align:top;padding-left:8px;padding-right:0"
                      >
                        <div
                          style="background-color:#FAFAFA;font-weight:normal;padding:16px 24px 16px 24px"
                        >
                          ${email}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style="padding:16px 24px 16px 24px">
                <table
                  align="center"
                  width="100%"
                  cellpadding="0"
                  border="0"
                  style="table-layout:fixed;border-collapse:collapse"
                >
                  <tbody style="width:100%">
                    <tr style="width:100%">
                      <td
                        style="box-sizing:content-box;vertical-align:top;padding-left:0;padding-right:8px;width:150px"
                      >
                        <h3
                          style="font-weight:bold;text-align:right;margin:0;font-size:20px;padding:16px 24px 16px 24px"
                        >
                          Subject:
                        </h3>
                      </td>
                      <td
                        style="box-sizing:content-box;vertical-align:top;padding-left:8px;padding-right:0"
                      >
                        <div
                          style="background-color:#FAFAFA;font-weight:normal;padding:16px 24px 16px 24px"
                        >
                        ${subject}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style="padding:16px 24px 16px 24px">
                <table
                  align="center"
                  width="100%"
                  cellpadding="0"
                  border="0"
                  style="table-layout:fixed;border-collapse:collapse"
                >
                  <tbody style="width:100%">
                    <tr style="width:100%">
                      <td
                        style="box-sizing:content-box;vertical-align:top;padding-left:0;padding-right:8px;width:150px"
                      >
                        <h3
                          style="font-weight:bold;text-align:right;margin:0;font-size:20px;padding:16px 24px 16px 24px"
                        >
                          Message:
                        </h3>
                      </td>
                      <td
                        style="box-sizing:content-box;vertical-align:top;padding-left:8px;padding-right:0"
                      >
                        <div style="height:16px"></div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style="padding:16px 24px 16px 24px">
                <div
                  style="background-color:#FAFAFA;font-weight:normal;padding:16px 24px 16px 24px"
                >
                ${message}
                </div>
              </div>
              <div style="padding:16px 0px 16px 0px">
                <hr
                  style="width:100%;border:none;border-top:1px solid #CCCCCC;margin:0"
                />
              </div>
              <div
                style="font-size:10px;font-weight:normal;text-align:center;padding:16px 24px 16px 24px"
              >
                You can reply directly to this email.
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>`;
}
