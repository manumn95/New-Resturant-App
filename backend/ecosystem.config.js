module.exports = {
  apps: [
    {
      name: "mern-resturan",
      script: "./index.js",
      env: {
        NODE_ENV: "development",
        PORT: 8080,
        MONGODB_URL: "mongodb+srv://manumnofficial95:Mydb%40123@cluster0.aca2cjc.mongodb.net/MERN-Resturant",
        STRIPE_SECRET_KEY: "sk_test_51Pb1cYGaXbsHDA1rV1pdvlRVGQO99nYcHpGz5NgKsSiITW4PjgEpEejsvA3c9uJsnOpBW3ZQDd87HUT6p78uyz7r00MRCkspgW",
        FRONTEND_URL: "http://localhost:3000",
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 8080,
        MONGODB_URL: "mongodb+srv://manumnofficial95:Mydb%40123@cluster0.aca2cjc.mongodb.net/MERN-Resturant",
        STRIPE_SECRET_KEY: "sk_test_51Pb1cYGaXbsHDA1rV1pdvlRVGQO99nYcHpGz5NgKsSiITW4PjgEpEejsvA3c9uJsnOpBW3ZQDd87HUT6p78uyz7r00MRCkspgW",
        FRONTEND_URL: "http://localhost:3000",
      }
    }
  ]
};
