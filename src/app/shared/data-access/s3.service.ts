import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { UsersService } from '../../user/data-access/users.service';

@Injectable({
  providedIn: 'root',
})
export class S3UploaderService {
  private s3: S3Client | undefined;

    constructor(private usersService :UsersService) {
    
  }

  /* private usersService = inject(UsersService); */

  region = 'us-east-1'; //environment.region

  async initializeS3() {
    /* const credentials = await this.getTemporaryCredentials();
    AWS.config.credentials = new AWS.Credentials(credentials);
    AWS.config.region = 'TU_REGION';

    this.s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      params: { Bucket: 'NOMBRE_DE_TU_BUCKET' }
    }); */

    this.usersService.getS3Credentials().subscribe({
      next: (response) => {
        this.s3 = new S3Client({
          region: this.region,
          credentials: response,
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  /*   private getTemporaryCredentials(): Promise<any> {
    return this.http.get('URL_DE_TU_BACKEND/get-credentials').toPromise();
  } */

  async uploadFile(file: File): Promise<string> {
    /*   if (!this.s3) { */
    await this.initializeS3();
    /*  } */

    const objectKey = `${new Date().getTime()}-${file.name}`;

    const bucketName = 'divmension-0affd27f5153'; //environment.bucketName

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: objectKey,
      Body: file,
      ACL: 'public-read',
    });

    return new Promise(async (resolve, reject) => {
      if (this.s3) {
        try {
          const response = await this.s3.send(command);
          console.log(response);
          const objectUrl = `https://${bucketName}.s3.${this.region}.amazonaws.com/${objectKey}`;
          resolve(objectUrl);
        } catch (error) {
          reject(error);
        }
      } else {
        reject('The file could not be loaded');
      }

      /*  this.s3.upload(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.Location);
        }
      });  */
    });
    /*     uploadFile(): void {
      if (this.selectedFile) {
        this.s3Uploader.uploadFile(this.selectedFile)
          .then(url => {
            console.log('Archivo subido exitosamente:', url);
            // Aquí puedes guardar la URL en tu base de datos o hacer lo que necesites
          })
          .catch(err => {
            console.error('Error al subir el archivo:', err);
          });
      }
    } */
  }
}
