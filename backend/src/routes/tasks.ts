import { Router, Request, Response } from 'express';
import { body, validationResult } from "express-validator";
import { Task } from '../models/task';

const router = Router();
let tasks:Task[] = []
const taskValidationRules = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('completed').notEmpty().withMessage('Completed must be a boolean')
]

router.post('/', taskValidationRules, (req:Request, res:Response)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array() });
    }

    const task:Task = {
        id:tasks.length + 1,
        title: req.body.title,
        description: req.body.description,
        completed:false
    };

    tasks.push(task);
    res.status(201).json(task);
})

router.get('/', (req:Request, res:Response)=>{
    res.json(tasks)
})

router.get(':/id', taskValidationRules, (req:Request, res:Response)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array() });
    }
    
    const task = tasks.find((t) => t.id === parseInt(req.params.id));

    if(!task){
        res.status(404).send('Task not found');
    }else{
        res.json(task)
    }
});

router.put("/:id", taskValidationRules, (req:Request, res:Response)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array() });
    }
    
    const task = tasks.find((t)=>t.id ===parseInt(req.params.id));

    if(!task){
        res.status(404).send("Task don't exist");
    }else{
        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.completed = req.body.completed || task.completed;

        res.json(task);

    }
});

router.delete('/:id', (req:Request, res:Response)=>{
    const index:number = tasks.findIndex((t) => t.id === parseInt(req.params.id));

    if(index === -1){
        res.status(404).send('Task not exists');
    }else{
        tasks.splice(index, 1);
        res.status(204).send();
    }
});


export default router;