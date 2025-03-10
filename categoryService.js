const slugify = require("slugify")
const asyncHandler = require("express-async-handler");
const CategoryModel =require('../models/categoryModel');

exports.getCategories = asyncHandler( async(req, res) => {
    const page = req.query.page*1 || 1;
    const limit = req.query.limit*1 || 5;
    const skip = (page - 1) * limit;
    const categories = await Category.find({}).skip(skip).limit(limit);
    res.status(200).json({results: categories.length, page, data: categories});
});

exports.getCategory = asyncHandler(async(req, res) => {
    const {id} = req.params;
    const category = await Category.findById(id);
    if(!category){
        res.status(404).json({message: ` Category not found for this id ${id}`});
        
    }
    res.status(200).json({data: category});

});
exports.createCategory = asyncHandler(async(req, res) => {
    const name = req.body.name;
     const Category = await Category.create({name, slug: slugify(name)});
         res.status(201).json({data: Category});
 
 });
 
 
 exports.updateCategory = asyncHandler(async(req, res) => {
     const {id} = req.params;
     const name = req.body.name;
     const category = await Category.findByIdAndUpdate({_id: id}, { name, slug: slugify(name) }, {new: true});
     if(!category){
         res.status(404).json({message: `Category not found for this id ${id}`});
     }
     res.status(200).json({data: category});
 });
 
 exports.deleteCategory = asyncHandler(async(req, res) => {
         const {id} = req.params;
         const category = await Category.findByIdAndDelete(id);
         if(!category){
             res.status(404).json({message: `Category not found for this id ${id}`});
         }
         res.status(204).send();
 })

exports.getCategories =(req,res) => {
    res.send();
};


















    