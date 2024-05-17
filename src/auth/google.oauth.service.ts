import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { User } from "../users/user.entity";
import { UsersService } from "../users/users.service";

@Injectable()
export class GoogleOauthService extends PassportStrategy(Strategy, 'google'){
    constructor(private readonly usersService: UsersService, private jwtService: JwtService){
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_REDIRECT_URL,
            scope:['profile', 'email']
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: any){
        const user = await this.usersService.findByEmail(profile.email);
        if(!user){
            return 
        }

        return user;
    }

    async signIn(user : User) {

        const payload = {username:user.name,sub:user.id}
     return {
       access_token: this.jwtService.sign(payload),
     };
   }
}