import { Controller, Post, Get, Body, UsePipes, UseGuards } from '@nestjs/common';
import { RejectException } from './../common/exceptions/reject.exception';
import { SetResponse } from './../common/exceptions/resolve.exception';
import { FormPipe } from './../common/pipes/form.pipe';
import { User } from './../user/user.entity';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {

  /**
   * Método construtor
   *
   * @param authService 
   */
  constructor( private readonly authService: AuthService ) {
  }

  /**
   * Rota autenticada
   *
   */
  @Get('authorized')
  @UseGuards( AuthGuard )
  async authorized() {
    return { status: 200, data: 'mensagem' };
  }

  @Post('signup')
  @UsePipes(new FormPipe('signup', { trim: true }))
  async signup( @Body() body: User) {

    // Salva os itens
    try {

      // Cria uma nova instancia do usuário
      const user = new User();
      user.fill(['email', 'nome', 'senha'], body);

      // Salva o usuário
      await this.authService.signup(user);
      const savedUser = await this.authService.login(user);


      // Cria o token
      const token = await this.authService.createToken(savedUser);

      // Seta a resposta
      return new SetResponse({ token, user: savedUser.json() });

    } catch (error) {
      throw new RejectException(error);
    }
  }

  @Post('login')
  @UsePipes(new FormPipe('login', { trim: true }))
  async login( @Body() credentials: User) {
    try {

      // Tenta fazer o login
      const user = await this.authService.login(credentials);

      // Cria o token
      const token = await this.authService.createToken(user);

      // Seta a resposta
      return new SetResponse({ token, user: user.json() });

    } catch (error) {
      throw new RejectException(error);
    }
  }
}

// End of file
