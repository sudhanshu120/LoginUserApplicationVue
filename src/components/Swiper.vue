<template>
  <div class="carousel-container">
    <swiper-container
      :options="swiperOptions"
      class="mySwiper"
    >
      <swiper-slide v-for="photo in photos" :key="photo.id" class="carousel-slide">
        <div class="card">
          <img :src="photo.thumbnailUrl" alt="thumbnail" class="card-image" />
          <div class="card-content">
            <h3 class="card-title">{{ photo.title }}</h3>
          </div>
          <div class="card-actions">
            <i class="thumb-up-icon" @click="likePhoto(photo.id)"></i>
            <i class="thumb-down-icon" @click="dislikePhoto(photo.id)"></i>
          </div>
        </div>
      </swiper-slide>
    </swiper-container>
  </div>
</template>

<script>
import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';

export default {
  data() {
    return {
      photos: [],
      swiperOptions: {
        modules: [Navigation, Pagination],
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: true,
        pagination: {
          clickable: true,
        },
      },
    };
  },
  async created() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/photos');
      this.photos = await response.json();
    } catch (error) {
      console.error('Failed to fetch photos:', error);
    }
  },
  methods: {
    likePhoto(photoId) {
      console.log(`Liked photo with ID: ${photoId}`);
    },
    dislikePhoto(photoId) {
      console.log(`Disliked photo with ID: ${photoId}`);
    },
  },
};
</script>

<style scoped>
.carousel-container {
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
}

.mySwiper {
  width: 100%;
  height: 300px;
}

.carousel-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.card {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}

.card-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
}

.card-content {
  flex-grow: 1;
  padding: 0 20px;
}

.card-title {
  margin: 0;
  font-size: 1.2em;
}

.card-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.thumb-up-icon,
.thumb-down-icon {
  font-size: 1.5em;
  cursor: pointer;
  margin: 5px 0;
}

.thumb-up-icon {
  color: green;
}

.thumb-down-icon {
  color: red;
}
</style>
