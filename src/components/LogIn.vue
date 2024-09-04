<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Log In</button>
      <!-- Navigation to signup page -->
      <p class="login-link">
        don't have an account? <router-link to="/signup">Sign Up</router-link>
      </p>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      name: '',
      password: '',
      message: '',
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          name: this.name,
          password: this.password,
        });
if (response && response.data && response.data.message === 'Login successful') {
  this.$router.push('/movie-list');
} else {
  this.message = 'Invalid Credentials';
}

      } catch (error) {
        this.message = 'Login failed: ' + (error.response ? error.response.data.message : error.message);
      }
    },
  },
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: #fff;
  font-size: 16px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}
</style>
