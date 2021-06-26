import express from 'express';

// serve the swagger file
// will change this later to be on seperate subdomain
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';

const router = express();
const swaggerDocument = yaml.load(fs.readFileSync('./api//docs/swagger.yml', 'utf8'));

// /docs -> swagger docs
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

export default router;