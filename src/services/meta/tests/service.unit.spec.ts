import { generateAppData } from '../service'

const mockMethodDependencies: MethodDependencies = {
    logger: console,
}

describe('⚙️ Running tests for Meta Service', () => {
    it('has a generateMetaData method', () => {
        expect(generateAppData).toBeDefined()
    })

    it('has a generateMetaData that outputs expected information', async () => {
        const data = await generateAppData(mockMethodDependencies)
        expect(data).toBeDefined()
        expect(data).toHaveProperty('version')
        expect(data).toHaveProperty('name')
    })
})
