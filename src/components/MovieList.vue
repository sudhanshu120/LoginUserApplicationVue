<template>
  <div class="movie-list-container">
  <button @click="signOut" class="signout-button"><router-link class="signout-text" to="/login">Logout</router-link></button>
    <h2>Here is the list of {{ movies.length }} Movies</h2>

    <!-- Sort By Dropdown -->
    <div class="sort-container">
      <label for="sort">Sort By: </label>
      <select id="sort" v-model="selectedSort" @change="sortMovies">
        <option value="title-asc">Title (Ascending)</option>
        <option value="title-desc">Title (Descending)</option>
      </select>
    </div>

    <!-- Movie List -->
    <div class="movie-container">
      <div v-for="(movie) in paginatedMovies" :key="movie.id" class="movie-item">
        <div class="movie-card">
          <img :src="movie.url" alt="movie poster" class="movie-poster" />
          <div class="movie-info">
            <h3>{{ movie.title }}</h3>
          </div>
          <div class="movie-actions">
            <button @click="likeMovie(movie.id)" class="action-button like-button">Like</button>
            <button @click="dislikeMovie(movie.id)" class="action-button dislike-button">Dislike</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div class="pagination-controls">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>

    <!-- Button to Fetch Users -->
    <button @click="fetchUsers" class="fetch-users-button">Show Registered Users</button>

    <!-- Table to Display Users -->
    <div v-if="users.length > 0" class="user-table-container">
      <h2>Registered Users</h2>
      <table class="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Profession</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user._id">
            <td>
              <input v-if="editingUserId === user._id" v-model="editUser.name" />
              <span v-else>{{ user.name }}</span>
            </td>
            <td>{{ user.email }}</td>
            <td>
              <input v-if="editingUserId === user._id" v-model="editUser.phone" />
              <span v-else>{{ user.phone }}</span>
            </td>
            <td>{{ user.profession }}</td>
            <td>
              <button v-if="editingUserId === user._id" @click="updateUser(user._id)" class="action-button edit-button">Save</button>
              <button v-if="editingUserId !== user._id" @click="editUserInfo(user)" class="action-button edit-button">Edit</button>
              <button @click="deleteUser(user._id)" class="action-button delete-button">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      movies: [],
      users: [],
      selectedSort: 'voting-asc',
      editingUserId: null,
      editUser: {
        name: '',
        phone: '',
      },
      currentPage: 1,
      moviesPerPage: 5,
    };
  },
  computed: {
    sortedMovies() {
      let sorted = [...this.movies];

      if (this.selectedSort.includes('voting')) {
        sorted.sort((a, b) => this.selectedSort === 'voting-asc' ? a.voting - b.voting : b.voting - a.voting);
      } else if (this.selectedSort.includes('releaseDate')) {
        sorted.sort((a, b) => this.selectedSort === 'releaseDate-asc'
          ? new Date(a.releaseDate) - new Date(b.releaseDate)
          : new Date(b.releaseDate) - new Date(a.releaseDate));
      } else if (this.selectedSort.includes('title')) {
        sorted.sort((a, b) => this.selectedSort === 'title-asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title));
      }

      return sorted;
    },
    paginatedMovies() {
      const start = (this.currentPage - 1) * this.moviesPerPage;
      const end = start + this.moviesPerPage;
      return this.sortedMovies.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.sortedMovies.length / this.moviesPerPage);
    },
  },
  async created() {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
      this.movies = response.data;
    } catch (error) {
      console.error('Failed to fetch movie data:', error);
    }
  },
  methods: {
    sortMovies() {
      // Sorting logic is handled by computed property `sortedMovies`
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:3000/users'); // Adjust the endpoint as needed
        this.users = response.data;
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    },
    editUserInfo(user) {
      this.editingUserId = user._id;
      this.editUser = { ...user }; // Pre-fill the edit form
    },
    async updateUser(userId) {
      try {
        await axios.put(`http://localhost:3000/users/${userId}`, this.editUser); // Adjust endpoint if needed
        this.fetchUsers(); // Refresh the user list
        this.editingUserId = null; // Exit edit mode
      } catch (error) {
        console.error('Failed to update user:', error);
      }
    },
    async deleteUser(userId) {
      try {
        await axios.delete(`http://localhost:3000/users/${userId}`); // Adjust endpoint if needed
        this.fetchUsers(); // Refresh the user list
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    },
    likeMovie(movieId) {
      console.log(`Liked movie with id ${movieId}`);
    },
    dislikeMovie(movieId) {
      console.log(`Disliked movie with id ${movieId}`);
    },
  },
};
</script>


<style scoped>
.movie-card {
  height: 400px;
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  position: relative;
}

.movie-poster {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.movie-info {
  padding: 10px;
  text-align: center;
}
.movie-container {
 display: flex;
 flex-wrap: wrap;
 gap:20px;
}

.movie-actions {
  display: flex;
  justify-content: center;
  gap:20px;
  width: 100%;
  padding: 10px;
}

.action-button {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9em;
  color: white;
}

.like-button {
  background-color: #28a745; /* Green color for like */
}

.like-button:hover {
  background-color: #218838; /* Darker green for hover */
}

.dislike-button {
  background-color: #dc3545; /* Red color for dislike */
}

.dislike-button:hover {
  background-color: #c82333; /* Darker red for hover */
}

.pagination-controls {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination-controls button {
  padding: 5px 10px;
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9em;
  color: white;
  background-color: #007bff;
}

.pagination-controls button:disabled {
  background-color: #c0c0c0;
  cursor: not-allowed;
}

.pagination-controls span {
  margin: 0 10px;
}
.fetch-users-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  color: white;
  background-color: #007bff; /* Blue color for button */
  margin: 20px 0;
}

.fetch-users-button:hover {
  background-color: #0056b3; /* Darker blue for hover */
}

.user-table-container {
  margin-top: 20px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.user-table-container h2 {
  text-align: center;
  padding: 10px;
  background-color: #f8f9fa;
  margin: 0;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th, .user-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
}

.user-table th {
  background-color: #007bff; /* Blue color for header */
  color: white;
}

.user-table td input {
  border: 1px solid #ced4da;
  border-radius: 5px;
  padding: 5px;
  width: 100%;
  box-sizing: border-box;
}

.action-button.edit-button {
  background-color: #28a745; /* Green color for edit */
  margin: 0 10px;
}

.action-button.edit-button:hover {
  background-color: #218838; /* Darker green for hover */
}

.action-button.delete-button {
  background-color: #dc3545; /* Red color for delete */
  margin: 0 10px;
}

.action-button.delete-button:hover {
  background-color: #c82333; /* Darker red for hover */
}

.user-table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.user-table tbody tr:hover {
  background-color: #e9ecef; /* Light grey for hover */
}
.signout-text {
 text-decoration: none;
 color:white;
}
.signout-button {
  position: fixed;
  top: 10px;
  right: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  color: white;
  background-color: #dc3545; /* Red color for sign out */
  z-index: 1000; /* Ensure it stays above other elements */
}

.signout-button:hover {
  background-color: #c82333; /* Darker red for hover */
}

/* Adjust container padding if needed */
.movie-list-container {
  padding-top: 50px; /* Space for the fixed button */
}
</style>

