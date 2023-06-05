import { Router } from 'express';

//Importando controller para auth
import { forgotPassController } from '../modules/auth/useCases/forgotPass';
import { signInController } from '../modules/auth/useCases/signIn';

const authRoute = Router();

authRoute.post('/login', async (Request, Response) => {
  console.log('recebi');
  await signInController.handle(Request, Response);
});

authRoute.post('/change-pass', (Request, Response) => {
  forgotPassController.handle(Request, Response);
});

export { authRoute };

