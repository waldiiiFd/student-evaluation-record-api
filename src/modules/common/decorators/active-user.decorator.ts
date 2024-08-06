import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const ActiveUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);


/* El decorador @ActiveUser va a reemplazar al decorador @Req()   ejemplo: getProfile(@Req() req:RequestWithUser){}
se puede usar en cualquier parte que se utilice el decorador @Auth 
ejemplo ahora: getProfile(@ActiveUser user){}*/