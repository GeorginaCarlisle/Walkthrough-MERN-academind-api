const express = require('express');

const router = express.Router();

const DUMMY_PLACES = [
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

router.get('/:pid', (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find(p => {
    return p.id === placeId;
  });
  res.json({place}); // The same as { place: place }
});

router.get('/user/:uid', (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.find(p => {
    return p.creator === userId;
  });
  res.json({places});
});

module.exports = router;