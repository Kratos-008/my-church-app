import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('mgnbc2025', 10)

  await prisma.user.upsert({
    where: { email: 'admin@church.com' },
    update: {},
    create: {
      email: 'admin@church.com',
      password,
      role: 'ADMIN',
      name: 'Admin User',
    },
  })
}

main()
  .then(() => {
    console.log('✅ Admin user created: admin@church.com / mgnbc2025')
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })
