require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


morgan.token('postData', function getPostData (req){
  if(req.method==='POST'){
    return JSON.stringify(req.body)
  }
})

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))


app.get('/api/persons', (request,response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id',(request,response, next) => {
  Person.findById(request.params.id)
    .then( person => {
      if (person){
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.get('/api/info', (req,res,next) => {
  Person.countDocuments()
    .then(result => {
      const message = `<div>Phonebook has info for ${result} people <br> <br> </div>  <div>${new Date()} </div>`
      res.send(message)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id',(request,response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id',(request,response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.post('/api/persons',(request,response,next) => {
  const body = request.body

  // if(!body.name || !body.number){
  //     return response.status(400).json({
  //         error: 'Error: Please include both name and number.'
  //     })
  // }
  // if((persons.filter(person => person.name ===body.name)).length>0){
  //     return response.status(400).json({
  //         error:'name must be unique'
  //     })
  // }

  const person = new Person({
    name: body.name,
    number: body.number
    // id: Math.floor(Math.random()*(10000))
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError'){
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name ==='ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
