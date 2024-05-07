// to know more about uploadthing refer -> https://docs.uploadthing.com/api-reference/react

import { generateComponents } from "@uploadthing/react";
import { generateReactHelpers } from "@uploadthing/react";
 
import type { OurFileRouter } from "../app/api/uploadthing/core";
 
export const { UploadButton, UploadDropzone } =
  generateComponents<OurFileRouter>();

export const {useUploadThing, uploadFiles} = 
    generateReactHelpers<OurFileRouter>();