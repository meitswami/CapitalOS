import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, RefreshTokenDto, MfaSetupDto } from './dto/auth.dto';
import { Public } from '../../common/decorators/public.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser, AuthenticatedUser } from '../../common/decorators/current-user.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  login(@Body() dto: LoginDto, @Req() req: Request) {
    return this.authService.login(dto, req.ip, req.headers['user-agent']);
  }

  @Public()
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refresh(dto.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('logout')
  @ApiOperation({ summary: 'Logout and revoke refresh token' })
  logout(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: { refreshToken?: string },
  ) {
    return this.authService.logout(user.id, body.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('mfa/setup')
  @ApiOperation({ summary: 'Initialize MFA setup' })
  setupMfa(@CurrentUser('id') userId: string) {
    return this.authService.setupMfa(userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('mfa/enable')
  @ApiOperation({ summary: 'Enable MFA with TOTP verification' })
  enableMfa(@CurrentUser('id') userId: string, @Body() dto: MfaSetupDto) {
    return this.authService.enableMfa(userId, dto.code);
  }
}
