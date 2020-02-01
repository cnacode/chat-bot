import dummyService from './service';

export default {
    getVersion: async (req: APIRequest, res: APIResponse) => {
        const data = await dummyService.getDummyData();
        res.json(data);
    }
}