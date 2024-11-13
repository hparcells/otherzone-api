export const OTHERZONE_TYPES = ['mp4', 'png', 'pdf', 'gif', 'mp3', 'webm'] as const;

export type OtherzoneType = (typeof OTHERZONE_TYPES)[number];
