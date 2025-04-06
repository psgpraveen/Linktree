// app/api/treelink/photo/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/mongodb";
import Link from "@/app/model/List";

export async function PUT(req: NextRequest) {
  const { email, profilePic } = await req.json();

  if (!email || !profilePic) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    await connectToDB();

    const user = await Link.findOneAndUpdate(
      { email },                     
      { $set: { profilePic } },       
      { new: true, upsert: true }    
    );

    return NextResponse.json({ message: "Profile updated", user });
  } catch (err) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
