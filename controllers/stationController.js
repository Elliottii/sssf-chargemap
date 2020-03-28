'use strict';
const stationModel = require('../models/station');

const station_list_get = async (req, res) => {
    try {
        const stations = await stationModel.find().populate({
            path: "Connections",
            populate: [
                {path: "ConnectionTypeID"},
                {path: "LevelID"},
                {path: "CurrentTypeID"}
            ]
        });
        res.json(stations);
    } catch (e) {
        console.error('station_list_get', e);
        res.status(500).json({message: e.message});
    }
};

const station_get = async (req, res) => {
    try {
        const station = await stationModel.findById(req.params.id).populate({
            path: "Connections",
            populate: [
                {path: "ConnectionTypeID"},
                {path: "LevelID"},
                {path: "CurrentTypeID"}
            ]
        });
        res.json(station);
    } catch (e) {
        console.error('station_get', e);
        res.status(500).json({message: e.message});
    }
};

const station_post = async (req, res) => {
    const post = await stationModel.create(req.body);
    res.status(200).send(`Station ${post._id} created`);
};

const station_put = async (req, res) => {
    const put = await stationModel.updateOne(req.body);
    res.status(200).send(`Station ${req.body._id} updated`);
};

const station_delete = async (req, res) => {
    const del = await stationModel.deleteOne({_id: req.params.id});
    res.status(200).send(`Station with id ${req.params.id} was deleted`);
};

module.exports = {
    station_list_get,
    station_get,
    station_post,
    station_put,
    station_delete,
};
