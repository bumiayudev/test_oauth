import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/user.entity";



@Injectable()
export class JwtAuthService{
    constructor(private jwtService: JwtService){}
    login(user: User){
        const payload = {name: user.name,id:user.id}
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}