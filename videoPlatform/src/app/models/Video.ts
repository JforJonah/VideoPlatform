import {Comment} from './Comment';
export class Video {
  id: string;
  description: string;
  author: string;
  detail: string;//url
  createdDate: Date;
  like: []; //存的userId,喜欢这个视频的人
  unlike: [];
  comment: Comment;
  constructor(author: string, description: string, detail: string) {
    this.author = author;
    this.description = description;
    this.detail = detail;
  }
}
