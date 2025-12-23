export interface DashboardStats {
  totalUsers: number;
  dau: number;
  mau: number;
  revenue: number;
}

export interface ChartPoint {
  label: string;
  value: number;
}

export interface BeatSphireStats {
  totalUsers: number;
  activeRooms: number; // Discord/Spotify influence
  creatorPayouts: number; // Patreon influence
  matchSuccessRate: number; // Tinder influence
  activePersonas: {
    dating: number;
    social: number;
    creator: number;
    music: number;
  };
  trendingGenres: { label: string; value: number; color: string }[];
}