export interface ICoffeeMachine {
  id: number;
  modelId: number;
  businessUnitId: number;
  name: string;
  code: string;
}

export interface ICoffeeMachineModel {
  id: number;
  name: string;
}

export interface IBusinessUnit {
  id: number;
  parentId: number;
  name: string;
  type: number;
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
