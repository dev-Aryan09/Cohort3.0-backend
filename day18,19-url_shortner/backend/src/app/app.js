import express from "express";
import urlRoutes from "../routes/url.route.js";
import urlModel from "../models/url.model.js";

const app = express();

app.use(express.json());

app.use("/api/urls", urlRoutes);

/**
 * http://localhost:3000/shortCode => Redirects to the original URL
 */
app.get("/:code", async (req, res) => {
  const { code } = req.params;

  const url = await urlModel.findOne({ shortCode: code });

  if (!url) {
    return res.status(404).json({
      message: "URL Not Found",
    });
  }

  res.redirect(302, url.originalUrl);

  await urlModel.findOneAndUpdate(
    {
      shortCode: code,
    },
    {
      $inc: { clicks: 1 },
    },
  );
});

export default app;

// ---------- PAUSE & READ ----------

/*
res.redirect() function in Express.js redirects the client to a specified URL path.
Under the hood, Express sends an HTTP status code along with a Location header
to instruct the browser to make a new request to the target address.
*/

/*
 "$inc" is a MongoDB operator that increases a number directly inside the database, in one safe click.
 For example,
 If two people open the link at the same moment, both requests can read clicks: 4, both add 1, and both save 5.
 One click is lost. $inc tells MongoDB to add 1 inside the database in a single step, 
 so simultaneous clicks are always counted.
 */
