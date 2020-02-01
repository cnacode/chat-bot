import dummyService from './service';

export default {
    getDummyData: async (req: APIRequest, res: APIResponse) => {
        const data = await dummyService.getDummyData();
        res.json(data);
    }
}