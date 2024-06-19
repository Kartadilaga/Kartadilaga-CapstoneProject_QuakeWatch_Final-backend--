import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json()
        const { name, nominal, desc } = body

        await prisma.donations.create({
            data: {
                name: name,
                nominal: nominal,
                description: desc
            }
        })
        return NextResponse.json({ status: 200, message: 'Berhasil mengirim donasi!' })
    } catch (err) {
        return NextResponse.json({ status: 500, message: err.message })
    }
}