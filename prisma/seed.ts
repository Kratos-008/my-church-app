import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('mgnbc2025', 10)

  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@church.com',
      password,
      role: 'ADMIN',
    },
  })

  console.log('✅ Admin user created!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })