import {Comment} from './Comment';
export class Video {
  id: string;
  description: string;
  author: string;
  detail: string;
  createdDate: Date;
  like: [];
  unlike: [];
  comment: Comment;
  constructor(author: string, description: string, detail: string) {
    this.author = author;
    this.description = description;
    this.detail = detail;
  }
}
