import { NextResponse } from "next/server";
import { stylePresets } from "@/data/styles";

export async function GET() {
  return NextResponse.json({ data: stylePresets });
}


