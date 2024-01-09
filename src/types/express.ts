/* eslint-disable @typescript-eslint/no-namespace */
import { User as TUser } from 'src/user/entities/user.entity';

declare global {
  namespace Express {
    interface User extends TUser {}
  }
}
