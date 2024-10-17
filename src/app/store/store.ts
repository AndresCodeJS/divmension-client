import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { IUserStore } from '../shared/interfaces/user.interface';
import { inject, Injectable } from '@angular/core';
import { getToken, removeToken } from '../user/data-access/local-storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IChat } from '../chat/chat.interface';

export interface IState {
  user: IUserStore;
  isLoading: boolean;
  hideButton: boolean;
  intervalId: any;
  chat: IChat;
}

const initialState: IState = {
  user: {
    username: '',
    email: '',
    fullname: '',
    photoUrl: '',
  },
  isLoading: false,
  hideButton: false,
  intervalId: '',
  chat: {
    isOpen: false,
    to: 'none',
  },
};

export const Store = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(({ user, isLoading, intervalId, ...store }) => {
    return {
      setUser(user: IUserStore) {
        patchState(store, { user });
      },
      setPhoto(url: string) {
        patchState(store, { user: { ...user(), photoUrl: url } });
      },
      removeUser() {
        patchState(store, {
          user: {
            username: '',
            email: '',
            fullname: '',
            photoUrl: '',
          },
        });
      },

      setLoading(value: boolean) {
        patchState(store, { isLoading: value });
      },
      hideFloatingButton(value: boolean) {
        patchState(store, { hideButton: value });
      },
      openChat(username?: string) {
        console.log('recibe instruccion en el storage, ', username)
        patchState(store, {
          chat: {
            isOpen: true,
            to: username || '',
          },
        });
      },
      closeChat(){
        patchState(store, {
          chat: {
            isOpen: false,
            to: ''
          },
        });
      }
      /*  resetRefreshInterval(){

        clearInterval(intervalId())
        
        patchState(store, { intervalId: value  });
        console.log('se refresca timeout',)
      }, */
      /*  setRefreshInterval(value: any){
        patchState(store, { intervalId: value  });
      } */
    };
  }),
  withHooks({
    onInit(store) {
      //Usado para cargar el usuario logeado, al refrescar la pagina
      const http = inject(HttpClient);

      if (getToken()) {
        let authToken = getToken();

        const headers = new HttpHeaders({
          Authorization: authToken!,
        });

        //Se pasa a estado de carga para no mostrar los botones en el header antes de validar
        //si hay un usuario cargado
        store.setLoading(true);

        http
          .get<IUserStore>(
            'https://2cqvxzd6yh.execute-api.us-east-1.amazonaws.com/prod/users/refresh-page',
            { headers }
          )
          .subscribe({
            next: (user) => {
              store.setUser(user);
              store.setLoading(false);

              //TODO
              //Conecta websocket
              /*   console.log('Arranca el socket con ,', user.username);
              let contador = 0
              let intervalId = setInterval(() => {
                console.log('refrescando la conexion,')
              },1000)

              store.setRefreshInterval(intervalId) */

              /*  setTimeout (()=> {
                clearInterval(timeoutId)
              }, 10000) */
            },
            error: (err) => {
              console.log(err);
              store.setLoading(false);
              removeToken();
            },
          });
      }
    },
  })
);
