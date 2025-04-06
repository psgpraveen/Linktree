// src/app/api/treelink/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/mongodb";
import Link from "@/app/model/List";

export async function GET(req: NextRequest) {
  await connectToDB();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const email = searchParams.get("email");

  if (!userId && !email) {
    return NextResponse.json({ error: "❌ userId or email is required!" }, { status: 400 });
  }

  try {
    const query = userId ? { userId } : { email };
    const userLinks = await Link.findOne(query).select("links userId profilePic -_id");

    return NextResponse.json({
      links: userLinks?.links || [],
      userId: userLinks?.userId || "",
      profilePic: userLinks?.profilePic || "",
    });
  } catch (err) {
    console.error("❌ Error fetching links:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await connectToDB();
  
  const body = await req.json();
  console.log("body",body)
  const { userId, title, link, email, profilePic } = body;

  if (!userId || !title || !link || !email) {
    return NextResponse.json(
      { error: "❌ All fields (userId, title, link, email) are required!" },
      { status: 400 }
    );
  }

  try {
    const existingDoc = await Link.findOne({ email });

    if (existingDoc) {
      // Add to links array
      existingDoc.links.push({ title, link });
      await existingDoc.save();
    } else {
      // Create new user doc with first link
      console.log("Title",title);
      console.log("link",link);
      
      const newLink = new Link({
        userId,
        email,
        profilePic,
        links: [{ title, link }],
      });
      console.log("All Right",newLink);

      await newLink.save();
    }

    return NextResponse.json({ message: "✅ Link added successfully!" });
  } catch (err) {
    console.error("❌ Error adding link:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  await connectToDB();
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const link = searchParams.get("link");

  if (!email || !link) {
    return NextResponse.json({ error: "Email and Link are required" }, { status: 400 });
  }

  try {
    await Link.updateOne(
      { email },
      { $pull: { links: { link } } }
    );
    return NextResponse.json({ message: "✅ Link deleted" });
  } catch (error) {
    console.error("Error deleting link:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}






export async function PUT(req: NextRequest) {
  await connectToDB();
  const body = await req.json();
  const { email, userId } = body;

  if (!email || !userId) {
    return NextResponse.json(
      { error: "❌ Email and new userId are required!" },
      { status: 400 }
    );
  }

  try {

    // Check if the userId is already taken by another user
    const existingUser = await Link.findOne({ userId, email: { $ne: email } });
    console.log(existingUser);
    
    if (existingUser) {
      return NextResponse.json(
        { error: "❌ User ID already exists. Please choose another." },
        { status: 409 }
      );
    }

    // Update the userId
    await Link.updateOne({ email }, { $set: { userId } });

    return NextResponse.json({ message: "✅ User ID updated successfully!" });
  } catch (error) {
    console.error("❌ Error updating userId:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
