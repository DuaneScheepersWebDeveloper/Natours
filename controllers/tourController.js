const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// GET all tours
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};

// GET a single tour
exports.getTour = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour not found',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });
};

// POST a tour
exports.addTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
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

// PATCH(Update)
exports.updateTour = (req, res) => {
  // Implement your update logic here
};

// DELETE
exports.deleteTour = (req, res) => {
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
