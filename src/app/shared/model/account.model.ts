export class Account {
  constructor(
    public email: string,
    public firstName: string,
    public lastName: string,
    public activated?: boolean,
    public authorities?: string[],
    public langKey?: string,
    public password?: string
  ) {}
}
