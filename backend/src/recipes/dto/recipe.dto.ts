export class RecipeDto {
  name: string;
  ingredients: string[];
  preparationSteps: string[];
  preparationTime: number;
  photoUrl?: string;
}
