// types.d.ts
import { Request } from 'express';

export interface UserInfo extends Request {
    userId?: number;  // Adding the userId as an optional property
}

