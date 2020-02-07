import meta from '../service';

describe("⚙️ Running tests for Meta Service", () => {
    it("has a generateMetaData method", () => {
        expect(meta.generateMetaData).toBeDefined();
    })

    it("has a generateMetaData that outputs expected information", async () => {
        const data = await meta.generateMetaData();
        expect(data).toBeDefined();

        console.info(data)
        // expect(data).toHaveProperty('version');
        // expect(data).toHaveProperty('apiName');
    });
})