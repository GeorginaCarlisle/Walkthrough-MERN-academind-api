const { v4: uuidv4 } = require('uuid');

const HttpError = require('../models/http-error');

let DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FEmpire_State_Building&psig=AOvVaw03iqQl8OXsV-RmoR8XspC8&ust=1715171618438000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMjzxqzG-4UDFQAAAAAdAAAAABAE',
    address: '20 W 34th St., New York, NY 10001, United States',
    location: {
      lat: 40.7484445,
      lng: -73.9882447
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FEmpire_State_Building&psig=AOvVaw03iqQl8OXsV-RmoR8XspC8&ust=1715171618438000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMjzxqzG-4UDFQAAAAAdAAAAABAE',
    address: '20 W 34th St., New York, NY 10001, United States',
    location: {
      lat: 40.7484445,
      lng: -73.9882447
    },
    creator: 'u2'
  }
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find(p => {
    return p.id === placeId;
  });

  if (!place) {
    throw new HttpError('Could not find a place for the provided id.', 404);
  }
  res.json({place}); // The same as { place: place }
};

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.find(p => {
    return p.creator === userId;
  });
  if (!places) {
    return next(
      new HttpError('Could not find a place for the provided user id.', 404)
    );
  }
  res.json({places});
};

const createPlace = (req, res, next) => {
 const { title, description, coordinates, address, creator } = req.body;
 const createdPlace = {
  id: uuidv4(),
  title,
  description,
  location: coordinates,
  address,
  creator
 };

 DUMMY_PLACES.push(createdPlace);

 res.status(201).json({place: createdPlace});
};

const patchPlace = (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;
  const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex(P => P.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({place: updatedPlace});
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
  res.status(200).json({message: 'Deleted place.'})
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.patchPlace = patchPlace;
exports.deletePlace = deletePlace;