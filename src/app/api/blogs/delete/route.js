import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import fs from "fs";

export async function DELETE(request) {
    try {
        const blogid = request.nextUrl.searchParams.get('blogid')
        const data = await prisma.blogs.findUnique({
            where: { blogid: parseInt(blogid) }
        })

        await prisma.blogs.delete({
            where: { blogid: parseInt(blogid) }
        })

        fs.unlink('public/uploads/' + data.image, (cb) => { return cb })
        return NextResponse.json({ status: 200, message: 'Berhasil menghapus blog!' })
    } catch (err) {
        return NextResponse.json({ status: 500, message: err.message })
    }
}