import { NextRouter } from 'next/dist/client/router';

export interface IUploadCatAction {
  fileToUpload: File;
  router: NextRouter;
}
