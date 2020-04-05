export default function ({
    app,
    logger,
}: {
    app: Application
    logger: AppLogger
}) {
    // create basic error middleware
    const errorHandlerMiddleware = (
        err: Error,
        req: APIRequest,
        res: APIResponse,
        next: APINext
    ) => {
        if (!err) {
            err = new Error(
                'Unknown error has happened, the incident has been reported, please try again later'
            )
            logger.error('Unknown error caught at ErrorHandler', {
                data: {
                    body: req.body,
                    path: req.path,
                    params: req.params,
                    error: err,
                },
            })
        }
        res.status(500).send(err.message)
    }

    app.use(errorHandlerMiddleware)
}
