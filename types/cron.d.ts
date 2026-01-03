export interface ICronOptions {
  name: string;
  description: string;
  enabled: boolean;
  repeatTime: number; //in miliseconds
  cronExecute: () => void;
}
