import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

export const handler = async (event) => {
  const [record] = event.Records;

  const bucket = record.s3.bucket.name;
  const key = record.s3.object.key;

  const s3Client = new S3Client({});
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key
  });

  const { Body } = await s3Client.send(command);
  
  const chuncks = [];
  for await (const chunk of Body) {
    chuncks.push(chunk);
  }

  const users = JSON.parse(Buffer.concat(chuncks).toString('utf-8'));

  for (const user of users) {
    console.log(`Deve cadastrar o e-mail ${user.email}`);
  }
}