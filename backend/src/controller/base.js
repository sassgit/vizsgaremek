const express = require('express');
const baseSevice = require('../service/base');

module.exports = model => {
  const service = baseSevice(model);
  return {
    create: (req, res, next) =>
      service.create(req.body)
      .then(createdEntity => {
        res.status(201);
        res.json(createdEntity);
      }),
    findAll: (req, res, next) =>
      service.findAll()
      .then(list => res.json(list)),
    findOne: (req, res, next) =>
      service.findOne(req.params.id)
      .then(entity => res.json(entity)),
    updateOne: (req, res, next) => service.updateOne(req.params.id, req.body)
      .then(entity => res.json(entity))
      .catch(err => {
        res.statusCode = 501;
        res.json(err);
      }),
    delete: (req, res, next) => service.delete(req.params.id)
      .then(entity => res.json(entity))
      .catch(err => {
        res.statusCode = 501;
        res.json(err);
      })
  }
}