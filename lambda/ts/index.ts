import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";
import axios from 'axios';

const client = new S3Client({});

export const handler = async (event: any) => {
    console.log('hello world TS - S3 SDK');

    const command = new ListBucketsCommand({});

    try {
        const { Owner, Buckets } = await client.send(command);
        console.log(
        `${Owner?.DisplayName} owns ${Buckets?.length} bucket${
            Buckets?.length === 1 ? "" : "s"
          }:`
        );
        console.log(`${Buckets?.map((b) => ` • ${b.Name}`).join("\n")}`);
    } catch (err) {
        console.error(err);
    }

    const { data, status } = await axios.request({
            method: 'GET',
            url: 'https://hello-world.free.beeceptor.com',
    });

    console.log(JSON.stringify(data, null, 4));

}
