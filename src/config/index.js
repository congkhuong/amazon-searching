import joi from 'joi';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = joi.object({
  NODE_ENV: joi.string().allow(['development', 'production', 'test', 'provision']).default('development'),
  PORT: joi.number().default(8080),
  SENSE_API_V1: joi.string().required().description('Sense API v1'),
  SENSE_API_V2: joi.string().required().description('Sense API v2'),
}).unknown().required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  app: {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
  },
  sense: {
    apiV1: envVars.SENSE_API_V1,
    apiV2: envVars.SENSE_API_V2,
  },
};

export default config;
