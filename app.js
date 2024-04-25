const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
//----------------------------------------------------------------
//GET
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
}); //http://127.0.0.1:3000/api/v1/tours

app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);
  const id = Number(req.params.id);
  const tour = tours.find((el) => el.id === id);
  if (id > tours.length || !tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID or there is no tour available',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tours: tour,
    },
  });
}); //http://127.0.0.1:3000/api/v1/tours/5
//----------------------------------------------------------------
//POST a tour
app.post('/api/v1/tours', (req, res) => {
  // Assuming `tours` is defined and contains tour objects
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        console.error('Error writing file:', err);
        res.status(500).json({
          status: 'error',
          message: 'Failed to create new tour',
        });
      } else {
        res.status(201).json({
          status: 'success',
          data: {
            tour: newTour,
          },
        });
      }
    }
  );
});
//----------------------------------------------------------------
//PATCH(Update)

app.patch('/api/v1/tours/:id', (req, res) => {
  if (Number(req.params.id) > tours.length || !tours) {
    return res.status(404).json({
      status: 'fail',
      message: 'there is no tour available or the ID is invalid',
    });
  }
  res.status(200).json({
    status: 'success',
    data: { tour: '<Updated tour here ...>' },
  });
});
//----------------------------------------------------------------
//DELETE

app.delete('/api/v1/tours/:id', (req, res) => {
  if (Number(req.params.id) > tours.length || !tours) {
    return res.status(404).json({
      status: 'fail',
      message: 'there is no tour available or the ID is invalid',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port} http://127.0.0.1:${port}/`); //http://127.0.0.1:3000/
});
//----------------------------------------------------------------
