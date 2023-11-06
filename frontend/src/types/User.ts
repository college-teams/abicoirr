export interface UserDetails {
  firstname: string;
  lastname: string;
  email: string;
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
  role:ROLE
}

export type ROLE = "USER" | "ADMIN"