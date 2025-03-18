<template>
  <!-- Header siempre visible -->
  <header>
    <img src="https://ginesmad.com/wp-content/uploads/2016/02/Salud-Madrid.png" alt="Logo" class="header-logo" />
    <h1>Citas Médicas Madrid</h1>
    <div class="nav-links">
      <button v-if="showLogoutButton" @click="logout" class="header-button">
        Cerrar sesión
      </button>
    </div>
  </header>

  <!-- Contenedor con fondo dinámico (si no es la inicial se pone el fondo en blanco) -->
  <div :class="{ 'splide-background': isDefaultRoute, 'white-background': !isDefaultRoute }">
    <!-- Carrusel de imágenes si está en la página de inicio -->
    <Splide v-if="isDefaultRoute" :options="options" aria-label="Background Carousel">
      <SplideSlide>
        <img src="https://s.libertaddigital.com/2012/04/19/hosp_reyjuancarlos01.jpg" alt="Background 1" />
      </SplideSlide>
      <SplideSlide>
        <img src="https://s1.elespanol.com/2023/09/18/madrid/comunidad/795431145_236142318_1706x960.jpg" alt="Background 2" />
      </SplideSlide>
      <SplideSlide>
        <img src="https://media.licdn.com/dms/image/v2/D4D1BAQHxxRafn5ksnQ/company-background_10000/company-background_10000/0/1659833551418/hospital_gregorio_maran_cover?e=2147483647&v=beta&t=TdsvP5OVl1HP0jnMFDMSUKQLwKUiB615roabQ71gmOQ" alt="Background 2" />
      </SplideSlide>
      <SplideSlide>
        <img src="https://www.consalud.es/uploads/s1/31/19/59/3/2024-07-03-hospital-universitario-infanta-elena.jpeg" alt="Background 2" />
      </SplideSlide>
    </Splide>

    <div v-else>
      <RouterView />
    </div>
  </div>

  <!-- Nueva sección con fondo oscuro -->
  <div v-if="isDefaultRoute" class="welcome-section">
    <h2>Bienvenido a Citas Médicas Madrid</h2>
    <p>Accede a tu historial de citas médicas, consulta centros cercanos y más.</p>
    <div class="action-buttons">
      <RouterLink to="/login" class="action-button">Iniciar Sesión</RouterLink>
    </div>
  </div>

  <footer>
    <div class="footer-content">
      <p>&copy; 2024 Citas Médicas Madrid. Todos los derechos reservados.</p>
      <nav>
        <RouterLink to="/privacy-policy">Política de Privacidad</RouterLink>
        <RouterLink to="/terms">Términos y Condiciones</RouterLink>
        <RouterLink to="/contact">Contacto</RouterLink>
      </nav>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/splide/dist/css/splide.min.css';

const route = useRoute();
const router = useRouter();

const options = {
  type: 'fade',
  rewind: true,
  autoplay: true,
  interval: 2900,
  arrows: false,
  pagination: false,
};

// Determinar si estamos en una ruta con el carrusel (inicio)
const isDefaultRoute = computed(() => {
  return ['/', '/home'].includes(route.path);
});

// Mostrar botón "Iniciar Sesión" solo si no está en /login, /register, /privacy-policy, /terms o /contact
const showLoginButton = computed(() => {
  return !['/login', '/register', '/privacy-policy', '/terms', '/contact'].includes(route.path);
});

// Mostrar "Cerrar sesión" en cualquier ruta distinta de '/', '/login', '/register', '/privacy-policy', '/terms y /contact'
const showLogoutButton = computed(() => {
  return !['/', '/login', '/register', '/privacy-policy', '/terms', '/contact'].includes(route.path);
});

// Función para cerrar sesión y redirigir al inicio
const logout = () => {
  router.push('/');
};
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@500&display=swap');
@import "assets/styles.scss";
</style>
