import express from 'express';
const app = express();
// app.get('/', (req,res) => {
//     res.send('The Server Is Ready');
// });

app.get('/jokes' , (req,res) => {
    const Jokes = [
    {
        id: 1,
        setup: "Why do programmers prefer dark mode?",
        punchline: "Because light attracts bugs."
    },
    {
        id: 2,
        setup: "Why do Java developers wear glasses?",
        punchline: "Because they don't C#."
    },
    {
        id: 3,
        setup: "There are only 10 types of people in the world:",
        punchline: "Those who understand binary, and those who don't."
    },
    {
        id: 4,
        setup: "A SQL query walks into a bar, walks up to two tables and asks...",
        punchline: "'Can I join you?'"
    },
    {
        id: 5,
        setup: "Why did the JavaScript developer wear sunglasses?",
        punchline: "Because they didn't know `node`."
    },
    {
        id: 6,
        setup: "How many programmers does it take to change a light bulb?",
        punchline: "None. It's a hardware problem."
    },
    {
        id: 7,
        setup: "What is the most used language in programming?",
        punchline: "Profanity."
    },
    {
        id: 8,
        setup: "Why was the developer unhappy at their job?",
        punchline: "They wanted arrays."
    }
];
res.send(Jokes);
})

const port = process.env.PORT || 3000;

app.listen(port,() =>
{
    console.log(`Server is runnin at http://localhost:${port}`);

})
