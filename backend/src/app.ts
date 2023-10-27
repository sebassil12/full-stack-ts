import express, {NextFunction, Request, Response} from 'express';
import taskRoutes from "./routes/tasks"
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/tasks', taskRoutes)
app.get('/', (req:Request, res:Response)=>{
    res.send("Hello, Typescript express")
});

app.use((err:Error, req:Request, res:Response, next:NextFunction) =>{
    console.error(err.stack);
    res.status(500).send('Something went wrong');
})
app.listen(port, ()=>{
    console.log(`Server running at PORT ${port}`);
})



