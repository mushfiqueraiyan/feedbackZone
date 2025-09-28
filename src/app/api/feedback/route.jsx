import { NextResponse } from "next/server";

let feedbacks = [];

export async function GET() {
  return NextResponse.json(feedbacks);
}

export async function POST(req) {
  const data = await req.json();
  const { name, email, feedback } = data;

  if (!name || !email || !feedback) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  const newFeedback = { name, email, feedback, date: new Date().toISOString() };
  feedbacks.push(newFeedback);

  return NextResponse.json(newFeedback);
}
