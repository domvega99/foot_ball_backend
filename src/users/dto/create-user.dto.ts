export class CreateUserDto {
    readonly family_name: string;
    readonly given_name: string;
    readonly email: string;
    readonly password: string;
    readonly role: string;
    readonly key: string;
}
