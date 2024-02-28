const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const AppleStrategy = require('passport-apple');
const { v4: uuidv4 } = require('uuid');
const { Player, PlayerSettings } = require('../db/models');
const bcrypt = require('bcryptjs')
const isProduction = process.env.NODE_ENV === 'production';


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:  isProduction
        ? `${process.env.API_URL}/api/auth/google/callback`
        : 'http://localhost:8000/api/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const foundPlayer = await Player.findOne({ where: { email: profile.emails[0].value } });
        if (foundPlayer) return done(null, foundPlayer);
        const googlePassword = `${profile.displayName}-google-${profile.id.slice(-5)}`
        const hashedPassword = bcrypt.hashSync(googlePassword, 13)
        const image = profile.photos[0].value;

        const player = await Player.create({
            id: uuidv4(),
            name: profile.displayName ,
            email: profile.emails[0].value ,
            hashedPassword,
            profileImage: image ? image : null
        })

        const playerSettings = await PlayerSettings.create({
            id: uuidv4(),
            playerId: player.id,
            theme: 'light',
            locations: false,
            notifications: false
        })

        const playerPublic = {
            id: player.id,
            name: player.name,
            email: player.email,
            profileImage: player.profileImage,
            createdAt: player.createdAt,
        }

        return done(null, playerPublic)
    } catch(e) {
        return done(e, null);
    }
}));

passport.use(new AppleStrategy({
    clientID: process.env.APPLE_SERVICES_ID, // Your Services ID
    teamID: process.env.APPLE_TEAM_ID, // Your Apple Team ID
    keyID: process.env.APPLE_KEY_ID, // Your Key ID
    privateKeyLocation: "path/to/your/private/key.p8", // Path to your private key file
    callbackURL:  isProduction
    ? `${process.env.API_URL}/api/auth/apple/callback`
    : 'http://localhost:8000/api/auth/apple/callback'
}, (accessToken, refreshToken, profile, done) => {
    done(null, profile);
}));

passport.serializeUser((player, done) => {
    done(null, player.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const player = await Player.findByPk(id);
        done(null, player);
    } catch (e) {
        done(e, null);
    }

});
