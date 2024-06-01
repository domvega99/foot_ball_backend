import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from 'passport-facebook';
import { AuthService } from "../auth.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy) {

    constructor(
        private configService: ConfigService,
        @Inject('AUTH_SERVICE') private readonly authService: AuthService
    ) {
        super({
            clientID: configService.get<string>('FACEBOOK_APP_ID'),
            clientSecret: configService.get<string>('FACEBOOK_APP_SECRET'),
            callbackURL: configService.get<string>('FACEBOOK_CALLBACK_URL'),
            profileFields: ['id', 'emails', 'name'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile) {
        const profiles = profile._json;

        const user = await this.authService.validateFBUser({ 
            facebookId: profiles.id,
            given_name: profiles.first_name,
            family_name: profiles.last_name,
        });

        console.log('Validate');
        console.log(user);
        return user || null;
    }


}