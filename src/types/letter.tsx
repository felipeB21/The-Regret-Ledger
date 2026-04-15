export interface Letter {
  id: string;
  content: string;
  targetName: string | null;
  targetLocation: string | null;
  targetCity: string | null;
  eventDate: Date | null;
  isAnonymous: boolean;
  viewsCount: number;
  authorId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
