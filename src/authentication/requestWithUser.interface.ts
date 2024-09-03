import { Request } from 'express';
import { UserDocument } from '../devs/users.shema';

interface RequestWithUser extends Request {
  user: UserDocument;
}

export default RequestWithUser;
