export interface UserDetails {
  id:number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: ROLE;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role:ROLE
}

export type ROLE = "USER" | "ADMIN"