const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const md5 = require('md5')
const randomstring = require('randomstring')

async function main() {
    const userid = randomstring.generate({ length: 12, charset: 'numeric' })
    await prisma.users.upsert({
        where: { id: 'USR' + userid },
        update: {},
        create: {
            id: 'USR' + userid,
            name: 'Admin',
            username: 'admin',
            password: md5('admin123')
        },
    })

}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })