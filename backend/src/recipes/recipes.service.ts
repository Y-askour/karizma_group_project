import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { RecipeDto } from './dto/recipe.dto';

@Injectable()
export class RecipesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllRecipes(userId: string) {
    return this.prisma.recipe.findMany({
      where: {
        userId,
      },
    });
  }

  async addRecipe(recipeDto: RecipeDto, userId: string) {
    return this.prisma.recipe.create({
      data: {
		  userId: userId,

		  photoUrl: recipeDto.photoUrl,
		  name: recipeDto.name,
		  preparationTime: recipeDto.preparationTime,

		  preparationSteps: recipeDto.preparationSteps,
		  ingredients: recipeDto.ingredients
      },
    });
  }

  async deleteRecipe(id: string) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id },
    });

    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    return this.prisma.recipe.delete({
      where: { id },
    });
  }
}

