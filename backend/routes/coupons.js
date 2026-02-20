const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon');

// Get all coupons
router.get('/', async (req, res) => {
  try {
    const coupons = await Coupon.findAll();
    res.json({
      success: true,
      data: coupons
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching coupons',
      error: error.message
    });
  }
});

// Get coupon by code
router.get('/validate/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const coupons = await Coupon.findAll();
    const coupon = coupons.find(c => c.code === code.toUpperCase());
    
    if (!coupon) {
      return res.json({
        success: false,
        message: 'Invalid coupon code'
      });
    }

    // Check if coupon is active
    if (!coupon.isActive) {
      return res.json({
        success: false,
        message: 'Coupon is not active'
      });
    }

    res.json({
      success: true,
      data: coupon
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error validating coupon',
      error: error.message
    });
  }
});

// Create new coupon
router.post('/', async (req, res) => {
  try {
    const couponData = {
      code: req.body.code.toUpperCase(),
      discountType: 'fixed',
      discountValue: req.body.discountValue,
      isActive: req.body.isActive !== undefined ? req.body.isActive : true,
      createdDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const coupon = await Coupon.create(couponData);
    res.status(201).json({
      success: true,
      data: coupon,
      message: 'Coupon created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating coupon',
      error: error.message
    });
  }
});

// Update coupon
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Coupon.update(req.body, {
      where: { id: req.params.id }
    });

    if (updated) {
      const updatedCoupon = await Coupon.findByPk(req.params.id);
      res.json({
        success: true,
        data: updatedCoupon,
        message: 'Coupon updated successfully'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Coupon not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating coupon',
      error: error.message
    });
  }
});

// Delete coupon
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Coupon.destroy({
      where: { id: req.params.id }
    });

    if (deleted) {
      res.json({
        success: true,
        message: 'Coupon deleted successfully'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Coupon not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting coupon',
      error: error.message
    });
  }
});

// Apply coupon (increment usage count)
router.post('/apply/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const coupons = await Coupon.findAll();
    const coupon = coupons.find(c => c.code === code.toUpperCase());
    
    if (!coupon) {
      return res.json({
        success: false,
        message: 'Invalid coupon code'
      });
    }

    // Increment usage count
    await Coupon.update(
      { usedCount: coupon.usedCount + 1 },
      { where: { id: coupon.id } }
    );

    res.json({
      success: true,
      message: 'Coupon applied successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error applying coupon',
      error: error.message
    });
  }
});

module.exports = router;
