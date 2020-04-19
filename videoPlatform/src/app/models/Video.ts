import {Comment} from './Comment';
export class Video {
  id: string;
  description: string;
  auth: string;
  title: string;
  url: string;
  createdDate: Date;
  like: [];
  unlike: [];
  comment: Comment[];
  constructor(author: string, description: string, url: string, title: string) {
    this.auth = author;
    this.description = description;
    this.url = url;
    this.title = title;
  }
}
