export default {
    getDummyData: (req: APIRequest, res: APIResponse, next: APINext) => {
        if(req.baseUrl) return next();
    }
}