import fs from 'fs'

import AWS from 'aws-sdk'
import { ListObjectsRequest, PutObjectRequest } from 'aws-sdk/clients/s3';
import PersistentFile from 'formidable/PersistentFile';

AWS.config.update({
  region: process.env.AMAZON_WS_REGION,
  accessKeyId: process.env.AMAZON_WS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AMAZON_WS_SECRET_ACCESS_KEY
});

const s3Bucket = new AWS.S3({ params: { Bucket: process.env.S3_BUCKET } });

function mapAttrs(file: any) {
  return {
    id: file.Key,
    url: `https://s3-us-east-1.amazonaws.com/${process.env.S3_BUCKET}/${file.Key}`,
    last_modified: file.LastModified
  }
}

export function uploadObject(fileToUpload : PersistentFile| any) : any {
  return new Promise((resolve, reject) => {
    const fileName = `${fileToUpload.originalFilename.split('.')[0]}-${Date.now()}.${fileToUpload.originalFilename.split('.')[1]}`;
    const data: PutObjectRequest  = {
      Key: fileName,
      Body: fs.createReadStream(fileToUpload.filepath),
      ContentDisposition: 'inline',
      ContentType: fileToUpload.mimetype,
      Bucket: process.env.S3_BUCKET || 'post-app-images-dev'
    };

    s3Bucket.upload(data, (err, response) => {
      if (err) {
        return reject(err);
      }
      return resolve(response);
    });

  });
}


export function deleteObject(fileId: any) {
  const fileUrl = fileId;
  let fileKey = '';
  if (fileUrl.includes('amazonaws.com')) {
    const [protocol, domain, , key ] = fileId.split('/');
    fileKey = key; 
    console.log(protocol);
    console.log(domain);
  }
  return new Promise((resolve, reject) => {
    const params = {
      Bucket : process.env.S3_BUCKET || 'findalocationstaging',
      Key: fileKey
    };
    s3Bucket.deleteObject(params, (err, response) => {
      if (err) {
        return reject(err);
      } 
      return resolve(response);
    });
  })
}

export function getObjects() {

  const files : any| any[] = [];

  const params : ListObjectsRequest = {
    Bucket: process.env.S3_BUCKET || 'findalocationstaging', 
  }; 

  return new Promise((resolve, reject) => {
    return s3Bucket.listObjects(params).on('success', function handlePage(r : any) : void {
      files.push(...r.data.Contents);

      if(r.hasNextPage()) {
        return r.nextPage().on('success', handlePage).send();
      } 
        return resolve(files.map((f:any) => mapAttrs(f)));
      
    }).on('error', (err) => {
      reject(err);
    }).send();
  });
}
