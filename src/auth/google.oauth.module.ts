import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleOauthStrategy } from './google-oauth.strategy';
import { GoogleOauthService } from './google.oauth.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'GoogleOauthStrategy' })],
  providers: [GoogleOauthService, GoogleOauthStrategy],
  exports: [GoogleOauthService],
})
export class GoogleOauthModule {}
