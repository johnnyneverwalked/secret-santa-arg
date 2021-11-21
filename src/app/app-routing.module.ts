import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {
        path: "",
        loadChildren: () => import("./pages/home/home.module").then(m => m.HomeModule)
    },
    {
        path: "contact",
        loadChildren: () => import("./pages/contact/contact.module").then(m => m.ContactModule)
    },
    {
        path: "riddles",
        loadChildren: () => import("./pages/riddles/riddles.module").then(m => m.RiddlesModule)
    },
    {
        path: "mIsHBoav",
        loadChildren: () => import("./pages/console/console.module").then(m => m.ConsoleModule)
    },
    {
        path: "**",
        loadChildren: () => import("./pages/home/home.module").then(m => m.HomeModule)
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
