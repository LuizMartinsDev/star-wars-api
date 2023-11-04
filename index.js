const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
const port = 3000


const Film = mongoose.model('Film', {
  title: String,
  description: String,
  image_url: String,
  trailer_url: String,
})


app.get('/movies/list', async (req, res) => {
  const films = await Film.find()
  return res.send(films)
})

app.delete("/movies/delete/:id", async (req, res) => {
  const film = await Film.findByIdAndDelete(req.params.id)
  return res.send(film)
})

app.put("/movies/update/:id", async (req, res) => {
  const film = await Film.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description,
    image_url: req.body.image_url,
    trailer_url: req.body.trailer_url,
  }, { new: true})
  return res.send(film)
})

app.post("/movies/create", async (req, res) => {
  const film = new Film({
    title: req.body.title,
    description: req.body.description,
    image_url: req.body.image_url,
    trailer_url: req.body.trailer_url,
  })

  await film.save()
  return res.send(film)
})

app.listen(port, () => {
  mongoose.connect('mongodb+srv://luizkwdev:MPgXiywnur9d5vOC@starwars-api.aw95mf1.mongodb.net/?retryWrites=true&w=majority')
  console.log(`A porta ${port} está batendo`)
})