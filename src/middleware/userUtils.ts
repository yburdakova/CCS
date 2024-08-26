import { UserData } from '../data/types';

export const getUserNameById = (id: number | null, users: UserData[]): string => {
  if (id === null) return 'Unknown';
  const foundUser = users.find((user: UserData) => user.id === id);
  return foundUser ? foundUser.name : 'Unknown';
};
