import {S3Client, GetObjectCommand} from "@aws-sdk/client-s3";
const AWS_REGION = process.env.AWS_REGION || "ap-southeast-2";
const s3Client = new S3Client({region: AWS_REGION});
import * as s3Data from "./s3Data.json";

export async function getS3Data() {
     try {
          const {Bucket, Key} = s3Data;
          const params = {Bucket, Key};
          console.log("bucketParams: ", params);

          let response = await s3Client.send(new GetObjectCommand(params));

          console.log("data: ", response);

          // Convert the ReadableStream to a string.
          const responseString = await response.Body!.transformToString();
          console.log("response trnsformed: ", responseString);
          return responseString;
     } catch (error: any) {
          console.log(error);
          return {error, message: error.Code};
     }
}
