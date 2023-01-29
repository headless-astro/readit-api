const ratingsModel = require("../models/ratings.model");

exports.getRating = async (req, res) => {
  const { title } = req.body;
  var rating = "";
  var sum = 0;

  const ratingResult = await ratingsModel.findOne({ title: title });
  if (ratingResult === null) {
    return res.status(422).json({
      success: false,
      message: "No rating data for movie.",
    });
  }

  if (ratingResult.ratings.length != 0) {
    ratingResult.ratings.forEach((element) => {
      sum += parseInt(element.rating);
    });
    rating = sum / ratingResult.ratings.length;
  }

  return res.json({
    success: true,
    message: "",
    data: rating,
  });
};

exports.getUserRating = async (req, res) => {
  const { title, userid } = req.body;
  var rating = "";

  const ratingResult = await ratingsModel.findOne({
    title: title,
    ratings: { $elemMatch: { user_id: userid } },
  });
  console.log(ratingResult);
  if (ratingResult === null) {
    return res.json({
      success: true,
      message: "",
      data: "",
    });
  }
  ratingResult.ratings.forEach((element) => {
    if (element.user_id === userid) {
      rating = element.rating;
    }
  });
  return res.json({
    success: true,
    message: "",
    data: rating,
  });
};

exports.removeRating = async (req, res) => {
  const { title, userid } = req.body;

  const ratingResult = await ratingsModel.findOne({
    title: title,
    ratings: { $elemMatch: { user_id: userid } },
  });

  if (ratingResult === null) {
    return res.status(422).json({
      success: false,
      message: "User has no rating for movie.",
    });
  }

  await ratingsModel.updateOne(
    { _id: ratingResult._id },
    {
      $pull: { ratings: { user_id: userid } },
    }
  );
};

exports.setRating = async (req, res) => {
  const { title, stars, userid } = req.body;

  const ratingResult = await ratingsModel.findOne({ title: title });
  if (ratingResult === null) {
    return res.status(422).json({
      success: false,
      message: "No rating for movie.",
    });
  }

  await ratingsModel.updateOne(
    { _id: ratingResult._id },
    {
      $pull: { ratings: { user_id: userid } },
    }
  );

  await ratingsModel.updateOne(
    { _id: ratingResult._id },
    {
      $push: { ratings: { user_id: userid, rating: stars } },
    }
  );

  return res.json({
    success: true,
    message: "",
  });
};
