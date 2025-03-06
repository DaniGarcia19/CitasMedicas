import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from '@/views/LoginComponent.vue';
import RegistroView from '@/views/RegistroView.vue';
import PrincipalView from '@/views/PrincipalView.vue';
import DatosView from '@/views/DatosView.vue';
import Privacy from '@/views/PrivacidadView.vue';

const routes = [
  { path: '/login', name: 'login', component: LoginComponent },
  { path: '/register', name: 'registro', component: RegistroView },
  { path: '/principal', name: 'principal', component: PrincipalView },
  { path: '/datos', name: 'Datos', component: DatosView},
  { path: '/privacy-policy', name: 'privacidad', component: Privacy},
  { path: '/terms', name: 'términos', component: Privacy},
  { path: '/contact', name: 'contacto', component: Privacy}
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
