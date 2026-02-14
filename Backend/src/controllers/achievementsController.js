const Achievement = require('../models/achievementModel');
const { validate, achievementValidationSchema } = require('../utils/validators');

// GET all achievements
exports.getAllAchievements = async (req, res, next) => {
  try {
    const { sort = '-date', page = 1, limit = 10, category } = req.query;
    
    let query = {};
    if (category) {
      query.category = category;
    }

    const skip = (page - 1) * limit;
    
    const achievements = await Achievement.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Achievement.countDocuments(query);

    res.status(200).json({
      success: true,
      data: achievements,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// GET achievement by ID
exports.getAchievementById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const achievement = await Achievement.findById(id);
    
    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: 'Achievement not found'
      });
    }

    res.status(200).json({
      success: true,
      data: achievement
    });
  } catch (error) {
    next(error);
  }
};

// CREATE new achievement
exports.createAchievement = async (req, res, next) => {
  try {
    const validation = validate(req.body, achievementValidationSchema);
    
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.details
      });
    }

    const achievement = new Achievement(validation.data);
    await achievement.save();

    res.status(201).json({
      success: true,
      message: 'Achievement created successfully',
      data: achievement
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE achievement
exports.updateAchievement = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const validation = validate(req.body, achievementValidationSchema);
    
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.details
      });
    }

    const achievement = await Achievement.findByIdAndUpdate(
      id,
      validation.data,
      { new: true, runValidators: true }
    );

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: 'Achievement not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Achievement updated successfully',
      data: achievement
    });
  } catch (error) {
    next(error);
  }
};

// DELETE achievement
exports.deleteAchievement = async (req, res, next) => {
  try {
    const { id } = req.params;

    const achievement = await Achievement.findByIdAndDelete(id);

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: 'Achievement not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Achievement deleted successfully',
      data: achievement
    });
  } catch (error) {
    next(error);
  }
};
