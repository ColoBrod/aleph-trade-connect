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
  vendorId: number;
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
}

export interface IRecipe {
  id: number;
  name: string;
}

export interface IError {
  id: number;
  code: string;
  name: string;
}
