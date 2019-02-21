import {UUID} from 'angular2-uuid';
import {Base} from '../base';

export class Player extends Base {
  name:string;
  displayName:string;
  uuid: UUID;
  rank_id: UUID;
  ip: string;
  inJudgement: boolean;
  badges: UserBadge[] = [];
  moderation: Moderation = new Moderation;
  preferences: Map<string, string> = new Map();
  blockedUsers: BlockedUser[] = [];
  forumdata: ForumData = new ForumData;
  balances: Map<UUID, number> = new Map;
  vanityitems: Map<UUID, number> = new Map;
  language: string;

  endpoint = "users";
  multiName = "users";
  singleName = "user";
}

class UserBadge {
  badge_id: UUID;
  progress: number;
  timeEarned: number;
}

class Moderation {
  muted: boolean;
  ban_end_time: number;
  mute_end_time: number;
  banned: boolean;
}

class BlockedUser {
  user_id: UUID;
  blocked_at: number;
}

class ForumData {
  forumID: number;
  registered: boolean;
  forumKey: string;
  forumKeyExpires_at: number;
}
