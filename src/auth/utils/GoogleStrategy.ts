import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
import { AuthService } from "../auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {

    constructor(
        @Inject('AUTH_SERVICE') private readonly authService: AuthService
    ) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: process.env.GOOGLE_SCOPE.split(','),
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile) {
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);
        const user = await this.authService.validateUser({ 
            given_name: profile.name.givenName,
            family_name: profile.name.familyName,
            email: profile.emails[0].value, 
            
        });
        console.log('Validate');
        console.log(user);
        return user || null;
    }
}