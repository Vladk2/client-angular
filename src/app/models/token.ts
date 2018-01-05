
export class Roles {
  constructor(public admin: string, public employee: string, public tenant: string, public supervisor: string) {
  }
}
export class Token {
  constructor(public username: string, public roles: Roles,
  	public jwt: string) {
  }
}
