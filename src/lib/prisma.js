// /lib/prisma.js
import { PrismaClient } from '@prisma/client';

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({ log: ['error', 'warn'] });
} else {
  // Avoid creating many instances during dev hot-reload
  if (!global.prisma) {
    global.prisma = new PrismaClient({ log: ['error', 'warn'] });
  }
  prisma = global.prisma;
}

export default prisma;
