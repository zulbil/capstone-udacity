import AWS from 'aws-sdk'

const s3 = new AWS.S3({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
});

console.log(process.env.AWS_ACCESS_KEY_ID);

interface File {
  name: string;
  data: Buffer;
}

export async function uploadFileToS3(file: any) : Promise<string>{
  
  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET,
    Key: file.name,
    Body: file.data
  };

  try {
    const fileUpload = await s3.upload(params).promise();
    return fileUpload['Location'];
  } catch (error) {
    console.error(error);
    throw error;
  }
}