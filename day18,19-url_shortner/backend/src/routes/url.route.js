import express from "express";
import {
  createShortUrlController,
  deleteUrlController,
  fetchAllUrlsController,
} from "../controllers/url.controller.js";

const router = express.Router();

/**
 * @POST /api/urls/
 */
router.post("/", createShortUrlController);

/**
 * @GET /api/urls/
 */
router.get("/", fetchAllUrlsController);

/**
 * @DELETE /api/urls/:id
 */
router.delete("/:id", deleteUrlController);

export default router;
