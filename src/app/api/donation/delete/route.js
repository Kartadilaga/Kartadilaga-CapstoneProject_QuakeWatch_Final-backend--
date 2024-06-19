import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request) {
    try {
        const donationid = request.nextUrl.searchParams.get('donationid')
        await prisma.donations.delete({
            where: { donationid: parseInt(donationid) }
        })
        return NextResponse.json({ status: 200, message: 'Berhasil menghapus data!' })
    } catch (err) {
        return NextResponse.json({ status: 500, message: err.message })
    }
}