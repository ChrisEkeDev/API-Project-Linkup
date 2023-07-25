'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

module.exports = {
  async up (queryInterface, Sequelize) {
   options.tableName = 'Events';
   await queryInterface.bulkInsert(options, [
    {
      groupId: 1,
      venueId: 1,
      name: 'Backgammon Tournament Round 1',
      description: 'Join Backgammon Brothers and Sisters for our exhilarating showdown - Tournament 1! Roll the dice, test your skills, and forge lasting bonds in this friendly yet fiercely contested event. Seasoned players and newcomers are welcome to experience the thrill of backgammon in an unforgettable tournament!',
      type: 'In person',
      private: false,
      capacity: 50,
      price: 50.00,
      startDate: '2023-06-15 13:00:00',
      endDate: '2023-06-15 17:00:00'
    },
    {
      groupId: 1,
      venueId: 5,
      name: 'Backgammon Tournament Final',
      description: 'The grand finale has arrived! Witness electrifying matches and tactical brilliance as finalists vie for the title at Backgammon Brothers and Sisters\' Tournament Final. Celebrate our tight-knit community, where the love of the game unites us all. Be part of history in the making - join us now!',
      type: 'In person',
      private: false,
      capacity: 10,
      price: 0,
      startDate: '2023-07-15 14:00:00',
      endDate: '2023-07-15 16:00:00'
    },
    {
      groupId: 5,
      venueId: 4,
      name: 'Horse Ride and Relax',
      description: 'Saddle up for "Horse Ride and Relax". Join us for a serene day of horseback riding amidst nature\'s beauty. Unwind as we trot through picturesque trails, bask in the tranquility of the outdoors, and bond with our amazing horses. Whether you\'re a seasoned rider or a beginner, this event is for everyone looking to de-stress and find solace in the company of these majestic creatures. Let\'s gallop into a day of pure bliss and create unforgettable memories!',
      type: 'In person',
      private: false,
      capacity: 100,
      price: 250.00,
      startDate: '2023-05-05 12:00:00',
      endDate: '2023-05-05 16:30:00'
    },
    {
      groupId: 3,
      venueId: null,
      name: 'Private Meet & Greet',
      description: 'Embrace the enigma at our Secret Meet and Greet! Join fellow truth-seekers in an exclusive event to connect, exchange intriguing theories, and unravel mysteries together. Dive deep into the realms of hidden knowledge and conspiracies. Let\'s bond over shared curiosities and strengthen our quest for the truth. Don\'t miss this clandestine gathering of minds!',
      type: 'Online',
      private: false,
      capacity: 50,
      price: 300.00,
      startDate: '2023-11-11 22:00:00',
      endDate: '2023-11-12 01:00:00'
    },
    {
      groupId: 2,
      venueId: 2,
      name: 'Crochet Off for Charity',
      description: 'Get ready for Crochet Off for Charity! Join our crochet enthusiasts in Atlanta for a fun-filled event where creativity knows no bounds. From beginners to experts, everyone can participate! Together, we\'ll craft for a cause, raising funds and spreading warmth to those in need. Let\'s stitch with love and make a difference! ',
      type: 'In person',
      private: false,
      capacity: 150,
      price: 0,
      startDate: '2023-10-17 08:00:00',
      endDate: '2023-10-17 12:00:00'
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Events';
    await queryInterface.bulkDelete(options)
  }
};
