const express = require('express')
const app = express()
 
const options = [
    {
        name: "rock",
        beats: "scissors",
        loses: "paper"
    },
    { 
        name: "paper",
        beats: "rock",
        loses: "scissors"
    },
    {
        name: "scissors",
        beats: "paper",
        loses: "rock"
    }
]

const getRandomOption = max => {
    return Math.floor(Math.random() * Math.floor(max))
}

const handleResult = (user, cpu) => {
    if (options[user].beats === options[cpu].name) {
        return "win"
    }
    else if (options[user].loses === options[cpu].name) {
        return "loss"
    }
    else {
        return "tie"
    }
}

app.get('/:options', function (req, res) {
    const cpu = getRandomOption(3)
    const user = options.findIndex((o) => o.name === req.params.options.toLowerCase())
    let response = {}

    if (user === -1) {
        response = {
            response: false,
            message: `${req.params.options} is not a valid option`
        }
    }
    else {
        response = {
            response: true,
            user: options[user].name,
            cpu: options[cpu].name,
            result: handleResult(user, cpu)
        }
    }

    res.send(response)
})
 
app.listen(3000)