import { google, sheets_v4 } from "googleapis";
import { Buffer } from "buffer";

/* const base64Key: string | undefined = process.env.GOOGLE_PRIVATE_KEY;
if (!base64Key) {
  throw new Error("GOOGLE_PRIVATE_KEY environment variable is not defined");
}

const privateKey: string = Buffer.from(base64Key, "base64").toString("utf-8"); */

if (!process.env.GOOGLE_PRIVATE_KEY) {
  throw new Error("GOOGLE_PRIVATE_KEY environment variable is not defined");
}

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join(
      "\n"
    ),
  },
  scopes: [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/spreadsheets",
  ],
});

const sheets = google.sheets({ version: "v4", auth });

interface AppendToSheetParams {
  prompt: string;
  result: string;
}

// Function to append data to the spreadsheet
export async function appendToSheet({
  prompt,
  result,
}: AppendToSheetParams): Promise<void> {
  const spreadsheetId = "19txWlEpGEMiBjW9oLyYJ87mHp67ZRCXdkPTEBTWXP-g";
  const range = "Sheet1!A:C";

  const values = [[new Date().toISOString(), prompt, result]];

  const requestBody: sheets_v4.Schema$ValueRange = {
    values,
  };

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody, // Use requestBody instead of resource
    });
  } catch (error) {
    console.error("Error appending data to Google Sheets:", error);
    throw error;
  }
}

// Function to read data from the spreadsheet
export async function readFromSheet(): Promise<any[]> {
  const spreadsheetId = "19txWlEpGEMiBjW9oLyYJ87mHp67ZRCXdkPTEBTWXP-g";
  const range = "Sheet1!A:C"; // Adjust range as needed

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    const rows = response.data.values;
    if (rows && rows.length) {
      return rows;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error reading data from Google Sheets:", error);
    throw error;
  }
}
