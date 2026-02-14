const Certification = require('../models/certificationModel');
const { validate, certificationValidationSchema } = require('../utils/validators');

// GET all certifications
exports.getAllCertifications = async (req, res, next) => {
  try {
    const { sort = '-dateObtained', page = 1, limit = 10, issuer } = req.query;
    
    let query = {};
    if (issuer) {
      query.issuer = { $regex: issuer, $options: 'i' };
    }

    const skip = (page - 1) * limit;
    
    const certifications = await Certification.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Certification.countDocuments(query);

    res.status(200).json({
      success: true,
      data: certifications,
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

// GET certification by ID
exports.getCertificationById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const certification = await Certification.findById(id);
    
    if (!certification) {
      return res.status(404).json({
        success: false,
        message: 'Certification not found'
      });
    }

    res.status(200).json({
      success: true,
      data: certification
    });
  } catch (error) {
    next(error);
  }
};

// CREATE new certification
exports.createCertification = async (req, res, next) => {
  try {
    const validation = validate(req.body, certificationValidationSchema);
    
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.details
      });
    }

    const certification = new Certification(validation.data);
    await certification.save();

    res.status(201).json({
      success: true,
      message: 'Certification created successfully',
      data: certification
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE certification
exports.updateCertification = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const validation = validate(req.body, certificationValidationSchema);
    
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.details
      });
    }

    const certification = await Certification.findByIdAndUpdate(
      id,
      validation.data,
      { new: true, runValidators: true }
    );

    if (!certification) {
      return res.status(404).json({
        success: false,
        message: 'Certification not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Certification updated successfully',
      data: certification
    });
  } catch (error) {
    next(error);
  }
};

// DELETE certification
exports.deleteCertification = async (req, res, next) => {
  try {
    const { id } = req.params;

    const certification = await Certification.findByIdAndDelete(id);

    if (!certification) {
      return res.status(404).json({
        success: false,
        message: 'Certification not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Certification deleted successfully',
      data: certification
    });
  } catch (error) {
    next(error);
  }
};
