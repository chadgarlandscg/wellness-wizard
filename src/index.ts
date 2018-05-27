import * as express from 'express';
import * as bodyParser from 'body-parser';
import {getContainer} from './container/inversify.config';
import {logger} from './util/Logger';
import {InversifyExpressServer} from 'inversify-express-utils';

(async () => {
    const container = await getContainer();
    let server = new InversifyExpressServer(container);
    server.setConfig((app) => {
        // let express support JSON bodies
        app.use(bodyParser.json());
        // error handling
        app.use(function (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
            logger.error(err.stack);
            next(err);
        });
        app.use(function (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
            res.status(500).send('Internal Server Error');
        });
    });

    let app = server.build();
    // setup express middleware logging and begin listening
    app.listen(3000, function () {
        logger.info('Example app listening on port 3000!');
    });
})();
