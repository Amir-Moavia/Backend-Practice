import express from 'express';
const app = express();
app.get('/', (req,res) => {
    res.send('The Server Is Ready');
});

const port = process.env.PORT || 3000;

app.listen(port,() =>
{
    console.log(`Server is runnin at http://localhost:${port}`);
    
})