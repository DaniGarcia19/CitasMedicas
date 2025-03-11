import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from '@/views/LoginComponent.vue';
import RegistroView from '@/views/RegistroView.vue';
import PrincipalView from '@/views/PrincipalView.vue';
import Centers from '@/views/CentroMedicosView.vue';
import DatosView from '@/views/DatosView.vue';
import Privacy from '@/views/PrivacidadView.vue';
import EditDatos from '@/views/EditDatosView.vue';
import CitasView from '@/views/GestionCitas.vue';

const routes = [
  { path: '/login', name: 'login', component: LoginComponent },
  { path: '/register', name: 'registro', component: RegistroView },
  { path: '/principal', name: 'principal', component: PrincipalView },
  { path: '/datos', name: 'Datos', component: DatosView },
  { path: '/centros', name: 'Centros', component: Centers },
  { path: '/privacy-policy', name: 'privacidad', component: Privacy },
  { path: '/terms', name: 'términos', component: Privacy },
  { path: '/contact', name: 'contacto', component: Privacy },
  { path: '/EditDatos', name: 'EditDatos', component: EditDatos },
  { path: '/citas', name: 'Citas', component: CitasView },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
