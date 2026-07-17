export type LotteryType = 'loteria' | 'chance' | 'baloto';

export interface LotteryResult {
  id: string;
  name: string;
  type: LotteryType;
  number: string;
  series?: string;
  date: string;
  prize?: string;
  superbalotas?: string[];
}

export interface Lottery {
  id: string;
  name: string;
  type: LotteryType;
  drawDays: string[];
  description: string;
}
