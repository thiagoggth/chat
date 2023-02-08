const requiredEnv = (envName: string) => {
  const envValue = process.env[envName];
  if (!envValue) throw new Error(`Environment variable ${envName} are required, but are undefined`);
  return envValue;
};

const env = (envName: string) => {
  return process.env[envName];
};

export default {
  PORT: Number(requiredEnv('PORT'))
};
