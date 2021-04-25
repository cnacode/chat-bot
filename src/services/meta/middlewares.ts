export const verify = {
    getAppData: (req: APIRequest, res: APIResponse, next: APINext) => {
        if (req.baseUrl) return next()
    },
}
