export enum DEFAULT_PAGINATION {
  PAGE = 0,
  PAGE_SIZE = 10,
}

export interface JwtPayload {
  id: string;
  iat: number;
  exp: number;
}

export const JWT_SECRET = process.env.JWT_SECRET!;
