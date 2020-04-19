import {Comment} from './Comment';
export class Video {
  id: string;
  description: string;
  author: string;
  title: string;
  url: string;
  createdDate: Date;
  like: []; //存的userId,喜欢这个视频的人
  unlike: [];
  comment: Comment[];

  constructor(author: string, description: string, url: string, title: string) {

    this.author = author;
    this.description = description;
    this.url = url;
    this.title = title;
  }
}
