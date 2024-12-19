const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())
morgan.token('body', (req) => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": "1"
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": "2"
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": "3"
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": "4"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (requests, response) => {
    const totalEntries = persons.length
    const currentTime = new Date().toString()
    response.send(
        `<p>Phonebook has info for ${totalEntries} people</p> <p>${currentTime}</p>`
    )
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    console.log(person)
    if(person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    return response.status(204).end()
})

const generateRandomId = () => {
    const min = 5;
    const max = 1000000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name) {
        return response.json({
            error: 'name is missing'
        })
    }

    if(!body.number) {
        return response.json({
            error: 'number is missing'
        })
    }

    const nameExist = persons.some(p => p.name === body.name)
    if(nameExist){
        return response.json({
            error: 'name already exists'
        })
    }

    const person = {
        id: generateRandomId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    return response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})