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
  is_delete: Date;
  is_active: boolean;
  is_created: Date;
  genres: Genre[];
  is_path_file: string;
}

export class Genre extends BaseModel {
  id: number;
  label: string;
  description: string;
}

export interface PagedResults<T> {
  count?: number;
  next?: Genre;
  previous?: Genre;
  results?: Genre[];
}

