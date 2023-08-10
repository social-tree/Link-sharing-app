import { NextResponse } from "next/server";
import { Platform } from "models"
import { connectMongoDB } from "libs";

export async function GET(){
    await connectMongoDB()

    const platforms = await Platform.find()

    return NextResponse.json(platforms, { status: 200 })
}