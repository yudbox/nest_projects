import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// помощью createParamDecorator создаем декоратор который будет принимать анонимную
// функцию с двумя параметрами, нам нужен второй ctx - контекст, т.к. мы параметры
// получаем из HTTP запроса, то используем switchToHttp и принимаем request,
//  если б мы получали данные из микросервиса, то использовали бы switchToRpc
// далее используем кастомный декоратор в контроллере
// ДЕКОРАТОР НЕ НАЙДЕТ request.user!!! если не подключить JwtAuthGuard который дополняет этими данными request

export const UserEmail = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
