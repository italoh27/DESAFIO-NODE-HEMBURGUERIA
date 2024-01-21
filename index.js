const express = require('express')
const uuid = require('uuid')


const app = express()
const port = 3002
app.use(express.json())


const checkordeid = (request, response, next) => {
   const { id } = request.params
   const index = ordes.findIndex(ordes => ordes.id === id)
   if (index < 0) {
      return response.status(404).json({ message: " orde not found" })
   }
   request.ordeindex = index
   request.ordeid = id
   next()
   console.log('id found successfully')
}

const ckeckrotasurl = (request, response, next) => {
   const { method, url } = request
   console.log({method, url})

   next()
  
}

const ordes = []
app.use(ckeckrotasurl)
app.get('/Orders', (request, response) => {
   return response.json(ordes)
})

app.post('/Orders', (request, response) => {

   const { order, ClientName, price, status } = request.body

   const orde = ({ id: uuid.v4(), order, ClientName, price, status })

   ordes.push(orde)

   return response.status(200).json(orde)

})

app.put('/Orders/:id', checkordeid, (request, response) => {
   const id = request.ordeid
   const index = request.ordeindex
   const { order, ClientName, price, status } = request.body
   const updateorde = { id, order, ClientName, price, status }
   ordes[index] = updateorde
   return response.status(200).json(updateorde)
})

app.delete('/Orders/:id', checkordeid, (request, response) => {

   const index = request.ordeindex
   ordes.splice(index, 1)
   return response.status(202).json({})
})

app.get('/Orders/:id', checkordeid, (request, response) => {
   const id = request.ordeid
   const especificorde = ordes.filter(ordes => ordes.id === id)
   return response.json(especificorde)

})

app.patch('/Orders/:id', checkordeid, (request, response) => {
   const index = request.ordeindex
   const statuspronto = ordes[index]
   statuspronto.status = 'Pronto'
   return response.json(statuspronto)
})

app.listen(port, () => {
   console.log(`Server started on the door ${port} 🚀`)
})