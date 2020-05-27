const express = require('express');
const router = express.Router();
const Task = require ('../models/task-model');

// Get all the tasks
router.get('/', async (req,res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(404).json({ message : err});
    }
});

// Submit a task
router.post('/', async (req, res) => {
    const task = new Task ({
        title: req.body.title,
        date: req.body.date
    });
    try {
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(404).json ({message : err});
    }
});

/*
router.post('/', (req, res) => {
    const task = new Task ({
        title: req.body.title,
        date: req.body.date
    });
    task
    .save()
    .then(data =>{
        res.status(201).json(data);
    })
    .catch(err =>{
        res.status(404).json({message: err});
    });
});
*/

// Get particular task
/*
router.get('/:taskId', async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId);
        res.status(200).json(task);
    } catch (err) {
    res.status(404).json({message: err});
}
});
*/

// Delete task
router.delete('/:postId', async (req, res) => {
    try {
    const removedTask = await Task.remove({_id: req.params.postId});
    res.status(201).json(removedTask);
    } catch (err) {
        res.status(404).json({message: err});
    }
});

// Update a task 
router.patch ('/:taskId', async(req, res) => {
    try {
        const updatedTask = await Task.updateOne(
            {_id : req.params.taskId},
            { $set: { title: req.body.title}},
            { $set: { date: req.body.date}}
);
res.status(201).json(updatedTask);
    } catch (err) {
        res.json({ message: err});
    }
});

module.exports = router;