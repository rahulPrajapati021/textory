import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { BACKEND_URL } from "../config/env";
import { toast } from "react-toastify";

let logoutHandler = null;
export function setLogoutHandler(fn) {
  logoutHandler = fn;
}

class ApiService {
  api;
  constructor() {
    // instance for axios created
    this.api = axios.create({
      baseURL: BACKEND_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // interceptor for token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // interceptor for error response
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.logout();
          if (logoutHandler) {
            logoutHandler();
          }
        }
        toast.error(error.response?.data?.message);
        return Promise.reject(error);
      },
    );
  }

  // methods onward

  // authentication based request ahead
  async login(email, password) {
    const response = await this.api.post("/api/v1/auth/login", {
      email,
      password,
    });
    return response.data;
  }
  async register(email, password, name) {
    const response = await this.api.post("/api/v1/auth/register", {email, password, name});
    return response.data;
  }
  logout() {
  }

  // user functions
  // get List of Published Post
  async getPublishedList(page=0, size=2) {
    const response = await this.api.get(`/api/v1/posts?page=${page}&size=${size}`);
    return response.data;
  }
  async getPostByCategory(categoryId, page = 0, size = 0) {
    const response = await this.api.get(`/api/v1/posts?page=${page}&size=${size}&categoryId=${categoryId}`)
    return response.data;
  }
  async getPostByAuthor(userId, page=0, size=0) {
    const response = await this.api.get(`/api/v1/posts/postByAuthor/${userId}?page=${page}&size=${size}`);
    return response.data;
  }
  async getUserPosts(type = "PUBLISHED", page=0, size=20) {
    const response = await this.api.get(`/api/v1/posts/userPosts?status=${type}&page=${page}&size=${size}`);
    return response.data;
  }
  // some category, tag  & list methods
  async getCategoryList(page=0, size=10, sortBy="id", asc=true) {
    const response = await this.api.get(`/api/v1/categories?page=${page}&size=${size}&sortBy=${sortBy}&asc=${asc}`);
    return response.data;
  }
  async getCategoryDetails(categoryId) {
    const response = await this.api.get(`/api/v1/categories/${categoryId}`);
    return response.data;
  }
  async createTags(tagList) {
    const response = await this.api.post("/api/v1/tags", {names: tagList});
    return response.data;
  }

  // post methods

  async createPost(formdata) {
    const response = await this.api.post("/api/v1/posts", formdata);
    return response.data;
  }
  async getPost(id) {
    const response = await this.api.get("/api/v1/posts/" + id);
    return response.data;
  }

  async updatePost(id, data) {
    const response = await this.api.put("/api/v1/posts/" +id, data);
    return response.data;
  }

  // category methods
  async createCategory(name) {
    const response = await this.api.post("/api/v1/categories", {name});
    return response.data;
  }
  
  async uploadProfilePic(formData) {
    const response = await this.api.post("/api/v1/user/profile-pic", formData, {headers: {"Content-Type": "multipart/form-data"}});
    return response.data;
  }
  async getAuthorDetails(userId) {
    const response = await this.api.get(`/api/v1/author/details/${userId}`);
    return response.data;
  }
}

export const apiService = new ApiService();
