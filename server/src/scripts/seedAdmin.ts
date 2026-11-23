// server/src/scripts/seedAdmin.ts
// Creates the first admin from ADMIN_EMAIL / ADMIN_PASSWORD in .env.
// Run once per database:  npm run seed:admin
// Safe to run again: an existing account with that email is promoted to admin, not duplicated.
import mongoose from 'mongoose';
import { config } from '../config';
import { connectDB } from '../config/db';
import { USER_ROLE } from '../modules/user/user.constant';
import { User } from '../modules/user/user.model';

const seedAdmin = async () => {
  const { name, email, password } = config.admin;
  if (!email || !password) {
    console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD in .env first.');
    process.exit(1);
  }

  await connectDB();

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    if (existing.role !== USER_ROLE.admin) {
      existing.role = USER_ROLE.admin;
      await existing.save();
      console.info(`Promoted ${email} to admin.`);
    } else {
      console.info(`Admin ${email} already exists. Nothing to do.`);
    }
  } else {
    await User.create({ name, email, password, role: USER_ROLE.admin });
    console.info(`Admin created: ${email}`);
  }

  await mongoose.disconnect();
};

seedAdmin().catch(async (error) => {
  console.error('Seeding failed:', error);
  await mongoose.disconnect();
  process.exit(1);
});
