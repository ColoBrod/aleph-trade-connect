export interface ICoffeeMachine {
  id: string;
  modelId: string;
  restaurantId: string;
  name: string;
  serialNumber: string;
}

export interface ICoffeeMachineModel {
  id: string;
  name: string;
  vendorId: string;
}

export interface ICoffeeMachineVendor {
  id: string;
  name: string;
}

export interface IBusinessUnit {
  id: string;
  parentId: string | null;
  name: string;
  type: '1' | '2' | '3';
  chatTelegramId: string;
  address?: string;
  lat?: string;
  lon?: string;
}

export interface IRecipe {
  id: number;
  name: string;
}

export interface IError {
  id: string;
  code: string;
  type: string;
  description: string;
}
