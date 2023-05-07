import dotenv from 'dotenv';
const dotenvConfig = () => {
  const { NODE_ENV } = process.env;

  switch (NODE_ENV) {
    case 'dev':
      dotenv.config({ path: '.env.dev' });
      break;

    case 'test':
      dotenv.config({ path: '.env.test' });
      break;

    case 'hom':
      dotenv.config({ path: '.env.hom' });
      break;

    default:
      dotenv.config();
      break;
  }
};

export default dotenvConfig;
