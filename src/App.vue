<template>

<Splide :options="options" aria-label="Background Carousel">
      <SplideSlide>
        <img src="https://atencionprimaria.almirallmed.es/wp-content/uploads/sites/12/2020/07/imagenesblog_varios_5-min.jpg" alt="Background 1" />
      </SplideSlide>
      <SplideSlide>
        <img src="https://atencionprimaria.almirallmed.es/wp-content/uploads/sites/12/2020/07/imagenesblog_varios_5-min.jpg" alt="Background 2" />
      </SplideSlide>
      <SplideSlide>
        <img src="https://atencionprimaria.almirallmed.es/wp-content/uploads/sites/12/2020/07/imagenesblog_varios_5-min.jpg" alt="Background 3" />
      </SplideSlide>
      <SplideSlide>
        <img src="https://atencionprimaria.almirallmed.es/wp-content/uploads/sites/12/2020/07/imagenesblog_varios_5-min.jpg" alt="Background 4" />
      </SplideSlide>
    </Splide>

  <header>
    <h1>Citas Médicas Madrid</h1>
    <div class="nav-links">
      <RouterLink to="/login" class="header-link">Iniciar Sesión</RouterLink>
    </div>
  </header>


  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/splide/dist/css/splide.min.css';

const options = {
  type: 'fade',
  rewind: true,
  autoplay: true,
  interval: 2900,
  arrows: false,
  pagination: false,
};

</script>

<style >
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@500&display=swap');
@import "assets/styles.scss";
</style>