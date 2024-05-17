import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { GoogleOauthService } from "./google.oauth.service";

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google'){
    constructor(private readonly authService: GoogleOauthService){
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_REDIRECT_URI,
            scope:['profile', 'email']
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback){

       const { id , displayName , emails, picture } = profile
       const user = {
            provider: 'google',
            providerId: id,
            email : emails[0].value,
            name: `${displayName}`,
            picture: picture
       }

       done(null, user);
    }
}