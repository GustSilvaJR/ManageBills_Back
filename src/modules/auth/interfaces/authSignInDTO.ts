export interface AuthSignInDTO {
  nome:string | undefined,
  email: string | undefined,
  administador: boolean | undefined,
  auth: boolean,
  token: string,
}