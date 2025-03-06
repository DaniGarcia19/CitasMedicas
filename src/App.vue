<template>
  <!-- Header siempre visible -->
  <header>
    <img src="https://ginesmad.com/wp-content/uploads/2016/02/Salud-Madrid.png" alt="Logo" class="header-logo" />
    <h1>Citas Médicas Madrid</h1>
    <div class="nav-links">
      <!-- Mostrar botón "Cerrar sesión" si el usuario está autenticado y no en las rutas de login o registro -->
      <button v-if="showLogoutButton" @click="logout" class="header-button">
        Cerrar sesión
      </button>
      <!-- Mostrar botón "Iniciar sesión" solo si no está en /login, /register, /privacy-policy, /terms o /contact -->
      <RouterLink v-else-if="showLoginButton" to="/login" class="header-link">
        Iniciar Sesión
      </RouterLink>
    </div>
  </header>

  <!-- Contenedor con fondo dinámico (si no es la inicial se pone el fondo en blanco) -->
  <div :class="{ 'splide-background': isDefaultRoute, 'white-background': !isDefaultRoute }">
    <!-- Carrusel de imágenes si está en la página de inicio -->
    <Splide v-if="isDefaultRoute" :options="options" aria-label="Background Carousel">
      <SplideSlide>
        <img src="https://www.comunidad.madrid/sites/default/files/styles/block_teaser_image/public/tarjeta_sanitaria.jpeg?itok=kSS1uuye" alt="Background 1" />
      </SplideSlide>
      <SplideSlide>
        <img src="https://s1.elespanol.com/2024/02/16/actualidad/833176842_240010149_1706x960.jpg" alt="Background 2" />
      </SplideSlide>
    </Splide>

    <!-- Cargar contenido de las demás rutas dentro del RouterView -->
    <div v-else>
      <RouterView />
    </div>
  </div>

  <!-- Footer -->
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
