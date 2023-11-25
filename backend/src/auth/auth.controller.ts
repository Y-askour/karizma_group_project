import { Controller, Post, Request, UseGuards ,Get, Body , Delete, Param} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RecipesService } from 'src/recipes/recipes.service';
import { RecipeDto } from 'src/recipes/dto/recipe.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,private readonly recipesService: RecipesService) {}


  @Post('signup')
  async signup(@Body() body: { username: string; password: string }) {
	  console.log("controller : ",body);
    return this.authService.signup(body.username, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get("recipes")
  async getAllRecipes(@Request() req: any) {
    return this.recipesService.getAllRecipes(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post("recipes")
  async addRecipe(@Request() req: any, @Body() recipeDto: any) {
    return this.recipesService.addRecipe(recipeDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('recipes/:id')
  async deleteRecipe(@Param('id') id: string) {
    return this.recipesService.deleteRecipe(id);
  }
}
