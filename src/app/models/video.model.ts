import BaseModel from './baseModel';
import {User} from './user.model';

export class Video extends BaseModel {

  id: number;
  title: string;
  description: string;
  owner: User;
  duration: number;
  file: string;
  size: number;
}
