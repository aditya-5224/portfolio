const Project = require('../models/projectModel');
const { validate, projectValidationSchema } = require('../utils/validators');

// GET all projects
exports.getAllProjects = async (req, res, next) => {
  try {
    const { sort = '-createdAt', page = 1, limit = 10, featured } = req.query;
    
    let query = {};
    if (featured === 'true') {
      query.featured = true;
    }

    const skip = (page - 1) * limit;
    
    const projects = await Project.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Project.countDocuments(query);

    res.status(200).json({
      success: true,
      data: projects,
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

// GET project by ID
exports.getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// CREATE new project
exports.createProject = async (req, res, next) => {
  try {
    const validation = validate(req.body, projectValidationSchema);
    
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.details
      });
    }

    const project = new Project(validation.data);
    await project.save();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    res.status(500).json({success: false, message: 'Failed to create project', error: error.message });
  }
};

// UPDATE project
exports.updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const validation = validate(req.body, projectValidationSchema);
    
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.details
      });
    }

    const project = await Project.findByIdAndUpdate(
      id,
      validation.data,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// DELETE project
exports.deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
      data: project
    });
  } catch (error) {
    next(error);
  }
};
