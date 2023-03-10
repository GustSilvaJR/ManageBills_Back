import { Request, Response } from 'express';
import { SignInUseCase } from './SignInUseCase';


export class SignInController {

  private _signInUseCase;

  constructor(signInUseCase: SignInUseCase) {
    this._signInUseCase = signInUseCase;
  }


  async handle(request: Request, response:Response) {

    let textResponse: any;

    //Recebendo dados vindos da requisição
    const { email, password } = request.body;

    console.log('Aqui:', email, password);

    const result = await this._signInUseCase.execute({ email, password });

    if (typeof result == 'object') {
      
      textResponse = {
        ...result,
      };

      return response.json(textResponse);

    } else {

      textResponse = {
        auth: result,
        msg: 'Usuário ou senha inválidos',
      };

      return response.json(textResponse);

    }

    
  }
}