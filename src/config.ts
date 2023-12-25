const env = process.env.NODE_ENV as 'production' | 'development' | 'test';

const config = {
  development: {
    api: {
      url: 'http://localhost:9000/api'
    },
  },
  production: {
    api: {
      url: 'http://62.113.111.120:9000/api'
    },
  },
  // production: {
  //   api: {
  //     url: 'https://backend.wmf24.ru/api'
  //     // url: 'http://62.113.111.120:9000/api'
  //   },
  // },
  
};

if (!config[env]) throw new Error("Не настроены переменные окружения");

export default config[env];
