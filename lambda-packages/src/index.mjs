import { randomUUID } from 'node:crypto';
import { response } from "./utils/response.mjs";
import jwt from 'jsonwebtoken';

export async function handler(event) {
  const payload = {
    sub: randomUUID,
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
  }

  const fakeJwtToken = jwt.sign(payload, process.env.JWT_SECRET);

  return response(200, {
    users: [
      { id: randomUUID(), accessToken: fakeJwtToken, name: "Nome 1" },
      { id: randomUUID(), accessToken: fakeJwtToken, name: "Nome 2" },
      { id: randomUUID(), accessToken: fakeJwtToken, name: "Nome 3" },
    ],
  })
}