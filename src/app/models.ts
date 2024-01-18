export interface User {
  login: string;
  password: string;
}

export interface LoginResponse {
  userInfo: UserInfo;
  tokens: Tokens;
}

export interface Tokens {
  token: string;
  refreshToken: string;
}

export interface UserInfo {
  userId: number;
  userName: string;
  userAvatar: string;
  userRole: number;
}

export interface Toast {
  text: string;
  type: string;
}
