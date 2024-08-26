import { inject, Injectable } from '@angular/core';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { UsersService } from '../../user/data-access/users.service';
import { constants } from '../../global';

@Injectable({
  providedIn: 'root',
})
export class S3UploaderService {
  public s3: S3Client | undefined;

  constructor(private usersService: UsersService) {}

  region = 'us-east-1'; //environment.region


  async uploadFile(file: File, type: string): Promise<any> {
    await this.usersService.getS3Credentials().subscribe({
      next: async (response) => {
        
        if(!response.AccessKeyId){
          return
        }
        let cred = {
          accessKeyId: response.AccessKeyId,
          secretAccessKey: response.SecretAccessKey,
          sessionToken: response.SessionToken,
        };
        this.s3 = new S3Client({
          region: this.region,
          credentials: cred,
        });

        const fileType = file.type.split('/');

        const objectKey =''

        if(type == constants.PROFILE){
          const objectKey = `${response.user}/profile-photo.${fileType[1]}`;
        }

        if(type == constants.POST){
          const objectKey = `${response.user}/posts/${new Date().getTime()}-${file.name}.${fileType[1]}`;
        }

        const bucketName = 'divmension-0affd27f5153'; //environment.bucketName

        const command = new PutObjectCommand({
          Bucket: bucketName,
          Key: objectKey,
          Body: file,
          ACL: 'public-read',
          ContentType: file.type, //indicarle al bucket de que tipo es el archivo que se esta subiendo
        });

        if (this.s3) {
          try {
            const response = await this.s3.send(command);
            console.log(response);
            const objectUrl = `https://${bucketName}.s3.${this.region}.amazonaws.com/${objectKey}`;
            console.log(objectUrl);
            return { photoUrl: objectUrl };
          } catch (error) {
            return;
          }
        } else {
          console.log('The file could not be loaded');
          return;
        }
      },
      error: (error) => {
        console.log(error);
        return;
      },
    });
  }

}
