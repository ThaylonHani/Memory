import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { LoginUserService } from './services/loginUser/login-user.service';
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), LoginUserService, importProvidersFrom(HttpClientModule) ,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              ''
            )
          },
        ],
        onError: (err) => {
          console.error("esse é o erro: " + err);
        }
      } as SocialAuthServiceConfig,
    }
  ]
};
