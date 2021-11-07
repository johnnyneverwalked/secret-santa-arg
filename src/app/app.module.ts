import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavBarModule} from "./core/components/nav-bar/nav-bar.module";
import {DividerSkewModule} from "./core/components/divider-skew/divider-skew.module";
import {ScrollToModule} from "@nicky-lenaers/ngx-scroll-to";
import {UnlockModule} from "./core/components/unlock/unlock.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        NavBarModule,
        DividerSkewModule,
        ScrollToModule.forRoot(),
        UnlockModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
