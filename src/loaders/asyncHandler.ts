const asyncHandler = (fn: any) => (
    req: APIRequest,
    res: APIRequest,
    next: APINext
) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

export default asyncHandler
