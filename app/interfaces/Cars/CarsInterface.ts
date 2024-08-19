export interface Cars {
  typeDriver: string;
  plate: string;
  manufacture: string;
  model: string;
  image: string;
  rentPerDay: number;
  capacity: number;
  description: string;
  transmission: string;
  available: boolean;
  type: string;
  year: number;
  availableAt: Date;
  options: string;
  specs: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface CreateCars {
  typeDriver: string;
  plate: string;
  manufacture: string;
  model: string;
  image: string;
  rentPerDay: number;
  capacity: number;
  description: string;
  transmission: string;
  available: boolean;
  type: string;
  year: number;
  availableAt: Date;
  options: string;
  specs: string;
  created_at: Date;
}

export interface UpdateCars {
  typeDriver: string;
  plate: string;
  manufacture: string;
  model: string;
  image: string;
  rentPerDay: number;
  capacity: number;
  description: string;
  transmission: string;
  available: boolean;
  type: string;
  year: number;
  availableAt: Date;
  options: string;
  specs: string;
  updated_at: Date;
}

export interface CreateCarsLogs {
  cars_id?: number;
  users_id: number;
  time_log: Date;
  action: string;
}

export interface QueryFilterCars {
  typeDriver?: string | undefined;
  date?: string | undefined;
  pickTime?: string | undefined;
  totalPassenger?: number | undefined;
}
