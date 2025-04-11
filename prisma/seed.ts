import { GENDER, PrismaClient } from '@prisma/client';
import { patients, deviceData, devices, users } from './data';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed with UPSERT...');

  // Users
  for (const user of users) {
    user.password = await bcrypt.hash(user.password, 10);
    await prisma.user.upsert({
      where: { email: user.email },
      update: user,
      create: user,
    });
  }
  console.log('✅ Upserted users');

  // Patients
  for (const patient of patients) {
    await prisma.patient.upsert({
      where: { email_phone: { email: patient.email, phone: patient.phone } },
      update: {
        ...patient,
        gender: patient.gender as GENDER,
      },
      create: {
        ...patient,
        gender: patient.gender as GENDER,
      },
    });
  }
  console.log('✅ Upserted patients');

  // Devices
  for (const device of devices) {
    await prisma.device.upsert({
      where: { serialNo: device.serialNo },
      update: device,
      create: device,
    });
  }
  console.log('✅ Upserted devices');

  // Device Data
  for (const entry of deviceData) {
    await prisma.deviceData.upsert({
      where: { id: entry.id },
      update: entry,
      create: entry,
    });
  }
  console.log('✅ Upserted device data');

  console.log('🌱 Seed complete!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
