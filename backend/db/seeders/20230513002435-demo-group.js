'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Groups';
    await queryInterface.bulkInsert(options, [
      {
        organizerId: 2,
        name: 'Backgammon Brothers & Sisters',
        about: 'Welcome to the world of Backgammon Brothers and Sisters! We are a passionate group of individuals united by our love for the classic game of Backgammon. With a shared commitment to fostering camaraderie and promoting strategic gameplay, we strive to create an inclusive and enjoyable environment for all.',
        type: 'In person',
        private: false,
        city: 'Mesa',
        state: 'AZ'
      },
      {
        organizerId: 1,
        name: 'Crochet Stitchers in Atlanta',
        about: 'Welcome to Crochet Stitchers Atlanta! We are a passionate group of crafters dedicated to the art of crochet. Join us for creative projects, learning new stitches, and fostering a supportive community. Let\'s weave together colorful yarns and create lasting connections! ',
        type: 'In person',
        private: false,
        city: 'Atlanta',
        state: 'GA'
      },
      {
        organizerId: 4,
        name: 'Conspiracy Theorists',
        about: 'Welcome to the Conspiracy Theorist Community! We are a group of curious minds exploring alternative perspectives and hidden truths. Engage in thought-provoking discussions on various topics, from government secrets to paranormal phenomena. Our goal is to foster a respectful environment for sharing ideas, questioning narratives, and expanding our understanding of the world. Join us as we delve into the mysteries that lie beyond the surface!',
        type: 'Online',
        private: true,
        city: 'Salem',
        state: 'OR'
      },
      {
        organizerId: 4,
        name: 'Web Developers Connect',
        about: 'Welcome to Web Developers Connect! We are a vibrant community of developers, coders, and tech enthusiasts, united by our passion for web development. Whether you\'re a seasoned pro or just starting your journey, here you\'ll find a supportive network to share ideas, learn new skills, and collaborate on exciting projects. Join us to stay up-to-date with the latest trends, attend workshops, and forge valuable connections. Let\'s grow together and shape the future of the digital world! ',
        type: 'Online',
        private: true,
        city: 'New York',
        state: 'NY'
      },
      {
        organizerId: 3,
        name: 'Horse Riders of the Storm',
        about: 'Welcome to Horse Riders of the Storm! We are a close-knit community of passionate equestrians, bound by our love for horses and the thrill of riding. Whether you\'re a beginner or a seasoned rider, join us to explore scenic trails, improve riding skills, and share unforgettable experiences with our equine companions. We organize fun events, clinics, and friendly competitions to foster camaraderie among horse enthusiasts. Come ride with us as we embrace the freedom of the open fields and create lasting memories together!',
        type: 'In person',
        private: false,
        city: 'Austin',
        state: 'TX'
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Groups';
    await queryInterface.bulkDelete(options)
  }
};
