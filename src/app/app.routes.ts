import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'user',
        loadChildren: () => import('./user/user-shell/user.route')

    }
];
