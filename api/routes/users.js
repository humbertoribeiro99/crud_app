import express from "express";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser
} from "../controllers/users.js";

const router = express.Router();

// Rotas para /users
router.route("/")
  .get(getUsers)    // GET /users - Lista usuários
  .post(addUser);   // POST /users - Cria novo usuário

// Rotas para /users/:id
router.route("/:id")
  .put(updateUser)    // PUT /users/:id - Atualiza usuário
  .delete(deleteUser); // DELETE /users/:id - Remove usuário

export default router;