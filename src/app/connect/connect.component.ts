import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-connect',
  standalone: true,
  imports: [
    CommonModule,
    SocialLoginModule,
    GoogleSigninButtonModule],
    providers: [
      {
        provide: 'SocialAuthServiceConfig',
        useValue: {
          autoLogin: false,
          providers: [
            {
              id: GoogleLoginProvider.PROVIDER_ID,
              provider: new GoogleLoginProvider(
                //'531965347941-27rc48dv483vkqm41r2t16uv40qnr3vc.apps.googleusercontent.com' //isemann.at
              //'292612486794-e4lfqpbr8ladsk14kgjq3dge2k9j1o7o.apps.googleusercontent.com' //isemann.fr
              '772702442622-7ate7ab33523tpqe8b97ncamn6tt1tt9.apps.googleusercontent.com' //localhost
              )
            }
          ],
          onError: (err) => {
            console.error(err);
          }
        } as SocialAuthServiceConfig
      }
    ],
  templateUrl: './connect.component.html',
  styleUrl: './connect.component.scss'
})
export class ConnectComponent {

}
