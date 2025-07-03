import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('pt-BR').format(num);
}

export function formatPercentage(num: number): string {
  return `${num}%`;
}

export function getSlotStatus(percentage: number): 'hot' | 'active' | 'cold' {
  if (percentage > 85) return 'hot';
  if (percentage > 70) return 'active';
  return 'cold';
}

export function getSlotStatusColor(percentage: number): string {
  const status = getSlotStatus(percentage);
  switch (status) {
    case 'hot': return 'text-red-500';
    case 'active': return 'text-green-500';
    case 'cold': return 'text-blue-500';
    default: return 'text-gray-500';
  }
}

export function simulatePlayerCountVariation(currentCount: number): number {
  const variation = Math.floor(Math.random() * 50) - 25; // -25 to +25
  return Math.max(0, currentCount + variation);
}
