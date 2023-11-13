const env = process.env.NODE_ENV as 'production' | 'development';

const config = {
  production: {
    api: {
      url: 'http://92.53.91.152:9000/api'
    },
  },
  development: {
    api: {
      url: 'http://localhost:9000/api'
    },
  },
};

if (!config[env]) throw new Error("Не настроены переменные окружения");

export default config[env];