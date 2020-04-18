export interface User {
  id: string;
  username: string;
  password: string;
  bio?: string;
  location?: string;
  sex?: 'male'|'female'|'secrete';
  profileImage?: string;
  firstName?: string;
  lastName?: string;
  // the watch history of the user, contains the id of the videos
  history?: string[];
  // the videos created by uploaded by users
  videos?: string[];
  // the videos user liked
  liked?: string[];
  unlike?: string[];
  // the users who subscribed by this user
  subscribe?: string[];
  // the video this user added to favorite
  favorite?: string[];
  // the fans of this user;
  subscribed?: string[];
}
