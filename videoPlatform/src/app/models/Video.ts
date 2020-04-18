export class Video {
  id: string;
  description: string;
  author: string;
  detail: {
    url: string;
    tag: string;
  };
  createdDate: Date;
  auth: string;
  like: [];
  unlike: [];
  constructor(author: string, description: string, detail: {url: string; tag: string}) {
    this.author = author;
    this.description = description;
    this.detail = detail;
  }
}
