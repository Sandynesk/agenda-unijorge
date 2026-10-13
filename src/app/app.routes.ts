import { Routes } from '@angular/router';
import { Pessoa } from './pessoa/pessoa';
import { CadastroEvento } from './pages/cadastro-evento/cadastro-evento';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'pessoa', component: Pessoa },
  { path: 'eventos', component: CadastroEvento },
  { path: 'eventos/novo', component: CadastroEvento },
  { path: '**', component: Home } //coringa
];