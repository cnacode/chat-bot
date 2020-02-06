import dummyService from './service';

export default {
    getMetadata: async (req: APIRequest, res: APIResponse) => {
        const data = await dummyService.generateMetaData();
        res.json(data);
    }
}