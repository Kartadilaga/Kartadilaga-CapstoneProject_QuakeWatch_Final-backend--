import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { writeFile } from "fs/promises";
import prisma from "@/libs/prisma";

export const POST = async (req, res) => {
    const directory = "public/uploads/"
    const formData = await req.formData()
    const FILE_TYPE = ['image/jpeg', 'image/png', 'image/jpeg']
    const FILE_SIZE = 2 * 1024 * 1024

    const title = formData.get("title")
    const image = formData.get("image")
    const desc = formData.get("desc")

    if (!title) {
        return NextResponse.json({ status: 400, message: "Name min 1 character!" });
    }

    if (!desc) {
        return NextResponse.json({ status: 400, message: "Description is required!" });
    }

    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }

    try {
        if (image.size > FILE_SIZE) {
            return NextResponse.json({ status: 400, message: "File size should not exceed 2MB!" });
        } else if (FILE_TYPE.includes(image.type)) {
            const buffer = Buffer.from(await image.arrayBuffer());
            const filename = Date.now() + image.name.replaceAll(" ", "_");

            await prisma.blogs.create({
                data: {
                    title: title,
                    image: filename,
                    description: desc
                }
            })

            await writeFile(
                path.join(process.cwd(), directory + filename),
                buffer
            )

            return NextResponse.json({ status: 200, message: "Berhasil mengupload blog!" });
        } else {
            return NextResponse.json({ status: 400, message: "File extensions invalid, only JPG, JPEG, PNG!" });
        }
    } catch (err) {
        return NextResponse.json({ status: 500, message: err.message })
    }
}