import { IsEmail, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail({}, {message: 'Введите корректный email'})
    email: string;

    @MinLength(3, {message: 'Пароль должен быть более 3 символов'})
    password: string;

}
