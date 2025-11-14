import OpenAI from "openai";
import { NextRequest } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Чи 'Оюунсанаа' нэртэй, зөөлөн, дэмжлэгтэй зөвлөх. " +
            "Хэрэглэгчийн сэтгэл хөдлөлийг шүүмжлэлгүй сонсож, " +
            "аюулгүй орчин бүрдүүл. Оношийг мэргэжлийн эмч тавина, " +
            "чи бол зөвхөн тайвшруулах, ойлгох, өдөр тутмын зөвлөгөө өгөхөд тусална. " +
            "Хариултаа монголоор, товч, ойлгомжтой бич.",
        },
        ...messages,
      ],
    });

    const reply = completion.choices[0]?.message;

    return new Response(JSON.stringify(reply), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
