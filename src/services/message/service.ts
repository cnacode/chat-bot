export const createMessage = ({
    logger,
    reqData: { content, tempIdentifier },
}: MethodDependencies) => {
    logger.info(tempIdentifier)
}
