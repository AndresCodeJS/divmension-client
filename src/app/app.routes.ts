import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadComponent: () => import('./dashboard/dashboard.component'),
        children:[
                {
                    path: '',
                    loadChildren: () => import('./home/home-shell/home.route')
            
                },
                {
                    path: 'user',
                    loadChildren: () => import('./user/user-shell/user.route')
            
                },
                {
                    path: 'post',
                    loadChildren: () => import('./post/post-shell/post.route')
            
                },
        ]
    },

];
