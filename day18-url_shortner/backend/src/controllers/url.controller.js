import { generateCode } from "../utils/generateCode.js";
import urlModel from "../models/url.model.js";

/**
 * req.body() = {url: "https://longUrl.com"}
 */
export const createShortUrlController = async (req, res) => {
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
    // Generate a 6 Character short code for the URL
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
};

/**
 * fetch all the URLS from Database
 */
export const fetchAllUrlsController = async (req, res) => {
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
};

/**
 * delete an URL based on unique id
 */
export const deleteUrlController = async (req, res) => {
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
};
