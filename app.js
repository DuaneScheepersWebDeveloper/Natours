const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
//----------------------------------------------------------------
//GET
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
};

const getTour = (req, res) => {
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
};

//----------------------------------------------------------------
//POST a tour

const addTour = (req, res) => {
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
};

//----------------------------------------------------------------
//PATCH(Update)
const updateTour = (req, res) => {
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
};

//----------------------------------------------------------------
//DELETE
const deleteTour = (req, res) => {
  const id = Number(req.params.id);
  const tourIndex = tours.findIndex((tour) => tour.id === id);
  if (tourIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour not found',
    });
  }
  tours.splice(tourIndex, 1);
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
//----------------------------------------------------------------
//app.get('/api/v1/tours', getAllTours); //http://127.0.0.1:3000/api/v1/tours
//app.get('/api/v1/tours/:id', getTour); //http://127.0.0.1:3000/api/v1/tours/5
//app.post('/api/v1/tours', addTour);
//app.patch('/api/v1/tours/:id', updateTour);
//app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(addTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);
//----------------------------------------------------------------
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
//----------------------------------------------------------------
