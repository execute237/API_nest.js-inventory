import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { AuthService } from '../auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector, private authService: AuthService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const roles = this.reflector.getAllAndOverride<Role[]>('roles', [
			context.getHandler(),
			context.getClass(),
		]);
		if (!roles) {
			return true;
		}
		const request = context.switchToHttp().getRequest();
		const email = request.user.email;
		const user = await this.authService.findUser(email);
		return roles.some((role) => user.role.includes(role));
	}
}
