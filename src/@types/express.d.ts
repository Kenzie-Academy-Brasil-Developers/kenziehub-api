declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
    pagination: {
      realPage: number;
      realTake: number;
    };
  }
}
