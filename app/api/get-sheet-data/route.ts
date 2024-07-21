import { NextRequest, NextResponse } from "next/server";
import { readFromSheet } from "../../../lib/googleSheet";

export async function GET(req: NextRequest) {
  try {
    const data = await readFromSheet();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching data", error: (error as Error).message },
      { status: 500 }
    );
  }
}
