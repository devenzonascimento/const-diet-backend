export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  age: number | null;
  height: number | null;
  weight: number | null;
  sex: string | null;
  activityLevel: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreate {
  email: string;
  password: string;     
  name: string; 
}

export interface UserUpdate {
  email: string;
  password: string;
  name: string;
  age: number | null;
  height: number | null;
  weight: number | null;
  sex: string | null;
  activityLevel: string | null;
}

export interface UserStats {
  age: number;
  height: number;
  weight: number;
  sex: string;
  activityLevel: string;
}

export interface UserLogin {
  email: string;
  password: string;     
}


export interface UserRepository {
  create: (data: UserCreate) => Promise<User>
  update: (userId: string, data: UserUpdate) => Promise<User>
  delete: (userId: string) => void
  findByEmail: (email: string) => Promise<User | null>
  addStats: (userId: string, data: UserStats) => Promise<User>
}