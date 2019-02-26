import BaseModel from './baseModel';
import {User} from './user.model';
import DateTimeFormat = Intl.DateTimeFormat;

export class Video extends BaseModel {

  id: number;
  title: string;
  description: string;
  owner: User;
  duration: number;
  file: string;
  size: number;
  is_deleted: Date;
  is_actived: Date;
}
