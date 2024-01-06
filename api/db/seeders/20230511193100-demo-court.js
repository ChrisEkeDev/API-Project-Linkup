'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

module.exports = {
    async up(queryInterface) {
        options.tableName = 'Courts';
        await queryInterface.bulkInsert(options, [
           {
                name: "Court Seed 1",
                placeId: 'M3S4C0U2T',
                address: '123 Fake St Mesa, AZ',
                lat: 33.4151843,
                lng: -111.8314724,
           },
            {
                name: "Court Seed 2",
                placeId: '4TL4NT4C0U2T',
                address: '345 Imaginary Ln Atlanta, GA',
                lat: 33.748752,
                lng: -84.38768449999999,
            },
            {
                name: "Court Seed 3",
                placeId: '54L3MC0U2T',
                address: '1000 Who Cares Blvd Salem, OR',
                lat: 44.9428975,
                lng: -123.0350963,
            },
            {
                name: "Court Seed 4",
                placeId: '4U5TINC0U2T',
                address: '78 Nowhere Dr Austin, TX',
                lat: 30.267153,
                lng: -97.7430608,
            },
            {
                name: "Court Seed 5",
                placeId: 'M3542C0U2T',
                address: '909 Out There Pkwy Mesa, AZ',
                lat: 33.4151843,
                lng: -111.8314724,
            }
        ])
    }
}
