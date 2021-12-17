import { S3 as _S3 } from 'aws-sdk';
import config from '../env';

const { AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME, AWS_ACCESS_KEY_ID } = config;
const S3 = new _S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  ACL: 'public-read'
});

export default { AWS_BUCKET_NAME, S3 };
