import { registerAs } from '@nestjs/config';

export default registerAs('cloud', () => ({
  storage: {
    baseUrl: process.env.STORAGE_BASE_URL,
    clientId: process.env.STORAGE_CLIENT_ID,
    clientSecret: process.env.STORAGE_CLIENT_SECRET,
    publicUrl: process.env.STORAGE_PUBLIC_URL,
    bucket: process.env.STORAGE_BUCKET,
  },
}));
