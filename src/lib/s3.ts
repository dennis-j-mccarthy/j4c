import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const s3Available = () =>
  !!(
    process.env.JFC_AWS_ACCESS_KEY_ID &&
    process.env.JFC_AWS_SECRET_ACCESS_KEY &&
    process.env.JFC_S3_BUCKET
  );

let client: S3Client | null = null;
function s3(): S3Client {
  if (!client) {
    client = new S3Client({
      region: process.env.JFC_AWS_REGION ?? "us-east-1",
      credentials: {
        accessKeyId: process.env.JFC_AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.JFC_AWS_SECRET_ACCESS_KEY!,
      },
    });
  }
  return client;
}

const BUCKET = () => process.env.JFC_S3_BUCKET!;

/** Presigned browser PUT, 10 minutes. */
export function presignPut(key: string, contentType: string): Promise<string> {
  return getSignedUrl(
    s3(),
    new PutObjectCommand({ Bucket: BUCKET(), Key: key, ContentType: contentType }),
    { expiresIn: 600 },
  );
}

/** Presigned GET for display, 1 hour — the bucket is private (account policy blocks public buckets). */
export function presignGet(key: string): Promise<string> {
  return getSignedUrl(
    s3(),
    new GetObjectCommand({ Bucket: BUCKET(), Key: key }),
    { expiresIn: 3600 },
  );
}

/** DB values are stored as "s3:<key>". Resolve to a viewable URL; pass through data:/local paths. */
export async function resolveMediaUrl(stored: string): Promise<string> {
  if (stored.startsWith("s3:")) return presignGet(stored.slice(3));
  return stored;
}
