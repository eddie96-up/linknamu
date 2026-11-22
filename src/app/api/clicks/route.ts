import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { profile } from "@/data/profile";

export const dynamic = "force-dynamic";

type ClickDoc = { _id: string; count: number; updatedAt: Date };

const validIds = new Set(profile.links.map((l) => l.id));

/** 링크 클릭 1회 기록: POST { id } */
export async function POST(req: Request) {
  let id: unknown;
  try {
    ({ id } = await req.json());
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }
  if (typeof id !== "string" || !validIds.has(id)) {
    return NextResponse.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  try {
    const db = await getDb();
    await db
      .collection<ClickDoc>("clicks")
      .updateOne(
        { _id: id },
        { $inc: { count: 1 }, $set: { updatedAt: new Date() } },
        { upsert: true },
      );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[clicks] POST 실패:", err);
    return NextResponse.json({ error: "집계에 실패했습니다." }, { status: 500 });
  }
}

/** 링크별 클릭 수 조회: GET → { counts: { [id]: number } } */
export async function GET() {
  try {
    const db = await getDb();
    const docs = await db.collection<ClickDoc>("clicks").find().toArray();
    const counts: Record<string, number> = Object.fromEntries(
      profile.links.map((l) => [l.id, 0]),
    );
    for (const d of docs) counts[d._id] = d.count;
    return NextResponse.json({ counts });
  } catch (err) {
    console.error("[clicks] GET 실패:", err);
    return NextResponse.json({ error: "조회에 실패했습니다." }, { status: 500 });
  }
}
