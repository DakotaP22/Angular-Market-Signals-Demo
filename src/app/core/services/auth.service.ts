import { Injectable, Signal, computed, effect, inject, signal } from '@angular/core';
import { toSignal, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, startWith, tap } from 'rxjs';
import * as firebase from 'firebase/compat';

type User = firebase.default.User;

type AuthState = {
  user: User | null;
  loading: boolean;
};

const initialAuthState: AuthState = {
  user: null,
  loading: true,
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private fireAuth = inject(AngularFireAuth);

  // state
  private state = signal(initialAuthState);

  // selectors
  user: Signal<User | null> = computed(() => this.state().user);
  isAuthenticated: Signal<boolean> = computed(() => !!this.user);
  loaded: Signal<boolean> = computed(() => !this.state().loading);

  // events
  authStateUpdated$: Observable<User | null> = this.fireAuth.authState.pipe(takeUntilDestroyed());

  // effects
  // private logState = effect(() => console.log(this.state()));

  constructor() {
    // reducers
    this.authStateUpdated$.subscribe((user) => {
      this.state.set({ user, loading: false });
    });
  }
}
