import { Lottery, LotteryResult } from '../types/lottery';

export const LOTTERIES: Lottery[] = [
  // Loterías tradicionales
  {
    id: 'cundinamarca',
    name: 'Lotería de Cundinamarca',
    type: 'loteria',
    drawDays: ['Lunes', 'Jueves'],
    description: 'Lotería oficial de Cundinamarca'
  },
  {
    id: 'bogota',
    name: 'Lotería de Bogotá',
    type: 'loteria',
    drawDays: ['Martes', 'Viernes'],
    description: 'Lotería oficial de Bogotá'
  },
  {
    id: 'medellin',
    name: 'Lotería de Medellín',
    type: 'loteria',
    drawDays: ['Martes', 'Viernes'],
    description: 'Lotería oficial de Medellín'
  },
  {
    id: 'valle',
    name: 'Lotería del Valle',
    type: 'loteria',
    drawDays: ['Miércoles', 'Sábado'],
    description: 'Lotería oficial del Valle del Cauca'
  },
  {
    id: 'manizales',
    name: 'Lotería de Manizales',
    type: 'loteria',
    drawDays: ['Miércoles', 'Sábado'],
    description: 'Lotería oficial de Caldas'
  },
  {
    id: 'cauca',
    name: 'Lotería del Cauca',
    type: 'loteria',
    drawDays: ['Martes', 'Viernes'],
    description: 'Lotería oficial del Cauca'
  },
  {
    id: 'meta',
    name: 'Lotería de Meta',
    type: 'loteria',
    drawDays: ['Lunes', 'Jueves'],
    description: 'Lotería oficial del Meta'
  },
  {
    id: 'santander',
    name: 'Lotería de Santander',
    type: 'loteria',
    drawDays: ['Miércoles', 'Sábado'],
    description: 'Lotería oficial de Santander'
  },
  {
    id: 'tolima',
    name: 'Lotería de Tolima',
    type: 'loteria',
    drawDays: ['Miércoles', 'Sábado'],
    description: 'Lotería oficial del Tolima'
  },
  {
    id: 'huila',
    name: 'Lotería del Huila',
    type: 'loteria',
    drawDays: ['Martes', 'Viernes'],
    description: 'Lotería oficial del Huila'
  },
  {
    id: 'boyaca',
    name: 'Lotería de Boyacá',
    type: 'loteria',
    drawDays: ['Miércoles', 'Sábado'],
    description: 'Lotería oficial de Boyacá'
  },
  {
    id: 'cruz-roja',
    name: 'Cruz Roja Colombiana',
    type: 'loteria',
    drawDays: ['Domingo'],
    description: 'Lotería benéfica de la Cruz Roja'
  },
  {
    id: 'risaralda',
    name: 'Lotería de Risaralda',
    type: 'loteria',
    drawDays: ['Miércoles', 'Domingo'],
    description: 'Lotería oficial de Risaralda'
  },
  {
    id: 'quindio',
    name: 'Lotería del Quindío',
    type: 'loteria',
    drawDays: ['Domingo'],
    description: 'Lotería oficial del Quindío'
  },
  
  // Chances
  {
    id: 'chance-cundinamarca',
    name: 'Chance Cundinamarca',
    type: 'chance',
    drawDays: ['Lunes', 'Jueves'],
    description: 'Chance de Cundinamarca - 4 cifras'
  },
  {
    id: 'chance-bogota',
    name: 'Chance Bogotá',
    type: 'chance',
    drawDays: ['Martes', 'Viernes'],
    description: 'Chance de Bogotá - 4 cifras'
  },
  {
    id: 'chance-medellin',
    name: 'Chance Medellín',
    type: 'chance',
    drawDays: ['Martes', 'Viernes'],
    description: 'Chance de Medellín - 4 cifras'
  },
  {
    id: 'chance-valle',
    name: 'Chance Valle',
    type: 'chance',
    drawDays: ['Miércoles', 'Sábado'],
    description: 'Chance del Valle - 4 cifras'
  },
  {
    id: 'chance-manizales',
    name: 'Chance Manizales',
    type: 'chance',
    drawDays: ['Miércoles', 'Sábado'],
    description: 'Chance de Manizales - 4 cifras'
  },
  {
    id: 'chance-tolima',
    name: 'Chance Tolima',
    type: 'chance',
    drawDays: ['Miércoles', 'Sábado'],
    description: 'Chance del Tolima - 4 cifras'
  },
  
  // Baloto
  {
    id: 'baloto',
    name: 'Baloto',
    type: 'baloto',
    drawDays: ['Martes', 'Viernes'],
    description: 'Baloto - 5 números + Superbalota'
  },
  {
    id: 'baloto-revancha',
    name: 'Baloto Revancha',
    type: 'baloto',
    drawDays: ['Martes', 'Viernes'],
    description: 'Baloto Revancha - Segunda oportunidad'
  }
];

// Datos de ejemplo - En producción, estos vendrían de una API real
export const MOCK_RESULTS: LotteryResult[] = [
  {
    id: '1',
    name: 'Lotería de Cundinamarca',
    type: 'loteria',
    number: '4521',
    series: '089',
    date: '2026-07-17',
    prize: '$5.000.000.000'
  },
  {
    id: '2',
    name: 'Lotería de Bogotá',
    type: 'loteria',
    number: '7834',
    series: '145',
    date: '2026-07-16',
    prize: '$4.500.000.000'
  },
  {
    id: '3',
    name: 'Baloto',
    type: 'baloto',
    number: '05-12-23-34-41',
    series: undefined,
    date: '2026-07-16',
    prize: '$18.000.000.000',
    superbalotas: ['15']
  },
  {
    id: '4',
    name: 'Baloto Revancha',
    type: 'baloto',
    number: '07-18-25-36-43',
    series: undefined,
    date: '2026-07-16',
    prize: '$2.500.000.000',
    superbalotas: ['09']
  },
  {
    id: '5',
    name: 'Chance Cundinamarca',
    type: 'chance',
    number: '4521',
    series: undefined,
    date: '2026-07-17',
    prize: 'Hasta $7.000.000'
  },
  {
    id: '6',
    name: 'Lotería de Medellín',
    type: 'loteria',
    number: '3298',
    series: '067',
    date: '2026-07-16',
    prize: '$4.800.000.000'
  },
  {
    id: '7',
    name: 'Lotería del Valle',
    type: 'loteria',
    number: '6745',
    series: '123',
    date: '2026-07-17',
    prize: '$4.200.000.000'
  },
  {
    id: '8',
    name: 'Chance Bogotá',
    type: 'chance',
    number: '7834',
    series: undefined,
    date: '2026-07-16',
    prize: 'Hasta $7.000.000'
  },
  {
    id: '9',
    name: 'Lotería de Manizales',
    type: 'loteria',
    number: '1567',
    series: '092',
    date: '2026-07-17',
    prize: '$3.900.000.000'
  },
  {
    id: '10',
    name: 'Lotería del Cauca',
    type: 'loteria',
    number: '8923',
    series: '076',
    date: '2026-07-16',
    prize: '$3.500.000.000'
  }
];
