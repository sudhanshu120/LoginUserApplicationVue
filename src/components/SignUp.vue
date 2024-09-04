<template>
  <div class="signup-container">
    <h2>Sign Up</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="phone">Phone Number:</label>
        <input type="tel" v-model="phone" required />
      </div>
      <div>
        <label for="profession">Profession:</label>
        <select v-model="profession" required>
          <option>Developer</option>
          <option>Designer</option>
          <option>Manager</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <div>
        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" v-model="confirmPassword" required />
      </div>
      <button type="submit">Sign Up</button>

      <!-- Navigation to login page -->
      <p class="login-link">
        Already have an account? <router-link to="/login">Log In</router-link>
      </p>

       <!-- Popup for success message -->
    <div v-if="showSuccess" class="popup-message">{{ successMessage }}</div>
    <p v-if="message">{{ message }}</p>

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
      email: '',
      phone: '',
      profession: '',
      password: '',
      confirmPassword: '',
      message: '',
      showSuccess: false,
      successMessage: '',
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
 methods: {
  async submitForm() {
    if (this.password !== this.confirmPassword) {
      this.message = "Passwords do not match!";
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/signup', {
        name: this.name,
        email: this.email,
        phone: this.phone,
        profession: this.profession,
        password: this.password,
      });

      // Check if response and response.data exist before accessing them
      if (response && response.data) {
        this.message = response.data.message;
        this.showSuccess = true;
       // Navigate to login page after a short delay
          setTimeout(() => {
            this.router.push('/login');
          }, 2000); // Adjust the delay as needed
        } else {
          this.message = "Unexpected error: No response data.";
        }
    } catch (error) {
      // Handle different error scenarios
      if (error.response && error.response.data) {
        this.message = 'An error occurred: ' + error.response.data.message;
      } else if (error.request) {
        this.message = 'No response from the server. Please try again later.';
      } else {
        this.message = 'Request failed: ' + error.message;
      }
    }
  },
}
,
};
</script>


<style scoped>
.signup-container {
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

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
  margin: 10px 0;
}

input,
select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: #fff;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

input:focus,
select:focus {
  border-color: #007bff;
  outline: none;
}

.signup-button {
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

.signup-button:hover {
  background-color: #0056b3;
}

button {
  margin-top: 20px;
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

.login-link {
  text-align: center;
  margin-top: 20px;
}

.login-link {
  color: #007bff;
  text-decoration: none;
}

.login-link:hover {
  text-decoration: underline;
  cursor: pointer;
}

/* Popup message style */
.popup-message {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 1000;
  }

</style>
