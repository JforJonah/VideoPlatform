export class Video {
  id: string;
  description: string;
  author: string;
  detail: string;
  createdDate: Date;
  auth: string;
  like: [];
  unlike: [];
  constructor(author: string, description: string, detail: string) {
    this.author = author;
    this.description = description;
    this.detail = detail;
  }
}
