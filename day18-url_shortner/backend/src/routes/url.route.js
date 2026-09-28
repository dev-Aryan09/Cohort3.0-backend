import express from "express";
import { generateCode } from "../utils/generateCode.js";
import urlModel from "../models/url.model.js";

const router = express.Router();

/**
 * @POST /api/urls/
 * req.body() = {url: "https://longUrl.com"}
 */
router.post("/", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      error: {
        message: "Please enter a valid URL",
      },
    });
  }

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return res.status(400).json({
      error: {
        message: "Please enter a valid URL starting with http:// or https://",
      },
    });
  }

  if (url.length > 2048) {
    return res.status(400).json({
      error: {
        message: "URL is too long",
      },
    });
  }

  try {
    const code = generateCode();

    const newUrl = await urlModel.create({
      originalUrl: url,
      shortCode: code,
    });

    return res.status(201).json({
      success: true,
      message: "Url Shortened Successfully",
      data: {
        originalUrl: newUrl.originalUrl,
        shortCode: newUrl.shortCode,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: {
        message: "Internal Server Error",
        error: error,
      },
    });
  }
});

/**
 * @GET /api/urls/
 * fetch all the URLS from Database
 */
router.get("/", async (req, res) => {
  try {
    const allUrls = await urlModel.find();

    return res.status(200).json({
      success: true,
      message: "All URLs Fetched Successfully",
      data: {
        allUrls,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: {
        message: "Internal Server Error",
        error: error,
      },
    });
  }
});

/**
 * @DELETE /api/urls/:id
 * delete an URL based on unique id
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUrl = await urlModel.findByIdAndDelete(id);

    if (!deletedUrl) {
      return res.status(404).json({
        message: "URL Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "URL Deleted Successfully",
      deletedUrl,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: {
        message: "Unable to delete url",
        error,
      },
    });
  }
});

export default router;
