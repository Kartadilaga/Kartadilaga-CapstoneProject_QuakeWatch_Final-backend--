import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import { rm } from "fs/promises";

export async function DELETE() {
    try {
        await prisma.blogs.deleteMany()
        rm('public/uploads', { recursive: true })
        return NextResponse.json({ status: 200, message: 'Berhasil mereset blog!' })
    } catch (err) {
        return NextResponse.json({ status: 500, message: err.message })
    }
}