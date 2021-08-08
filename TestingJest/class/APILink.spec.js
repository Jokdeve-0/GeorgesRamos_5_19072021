const APILink = require('../../src/js/class/APILink')
const product_id = require('../fixtures/datas').product_id
const {post_fixture_real,post_fixture_fake, add_product_store} = require('../fixtures/datas')

const LocalStorageMock = require('../fixtures/localStorage')
global.localStorage = new LocalStorageMock()

describe('When starting the application ', () => {

    it('Instantiating an APILink class', () => {
        const apiLink = new APILink("http://localhost:3000/api/cameras")
        expect(typeof (apiLink)).toBe("object")
        expect(apiLink.url).toEqual("http://localhost:3000/api/cameras")
    })
    
    it('Recovery of all products ', async () => {
        const apiLink = new APILink("http://localhost:3000/api/cameras")
        const retrieve = await apiLink.get_all_products()
        expect(typeof (retrieve)).toEqual("object")
        expect(typeof (retrieve[0].lenses)).toEqual("object")
        expect(typeof (retrieve[0]._id)).toEqual("string")
        expect(typeof (retrieve[0].name)).toEqual("string")
        expect(typeof (retrieve[0].price)).toEqual("number")
        expect(typeof (retrieve[0].description)).toEqual("string")
        expect(typeof (retrieve[0].imageUrl)).toEqual("string")
    })
    
    it('Recovery of all products with an error ', async () => {
        const apiLink = new APILink()
        const retrieve = await apiLink.get_all_products()
        expect(retrieve).toEqual(false)
    })
    
    // Warning ! risk of breakage if the product is removed in API
    it('Recovery of one product by id', async () => {
        const apiLink = new APILink("http://localhost:3000/api/cameras")
        const id = product_id()
        const retrieve = await apiLink.get_one_product(id)
        expect(typeof (retrieve)).toEqual("object")
        expect(typeof (retrieve.lenses)).toEqual("object")
        expect(typeof (retrieve._id)).toEqual("string")
        expect(typeof (retrieve.name)).toEqual("string")
        expect(typeof (retrieve.price)).toEqual("number")
        expect(typeof (retrieve.description)).toEqual("string")
        expect(typeof (retrieve.imageUrl)).toEqual("string")
    })
    it('Recovery of a product with an error of id', async () => {
        const apiLink = new APILink("http://localhost:3000/api/cameras")
        const id = "fake"
        const retrieve = await apiLink.get_one_product(id)
        expect(retrieve).toEqual(undefined)
    })

    it('Recovery of a product in localStorage with an error of id', () => {
        add_product_store()
        const id = "fake"
        const retrieve = localStorage.getItem(id)
        expect(retrieve).toEqual(false)
    })
    
    it('Recovery of a product with an error of url', async () => {
        const apiLink = new APILink()
        const id = product_id()
        const retrieve = await apiLink.get_one_product(id)
        expect(retrieve).toEqual(false)
    })

    it('Attempt to post correctly formatted data', async () => {
        const postFixture = post_fixture_real(localStorage)
        const apiLink = new APILink("http://localhost:3000/api/cameras")
        const retrieve = await apiLink.post_contact(postFixture)

        expect(typeof(retrieve)).toEqual("object")
        // data must contain these properties
        // a objet contact with these properties
        expect(typeof(retrieve.contact)).toEqual("object")
        expect(typeof(retrieve.contact.firstName)).toEqual("string")
        expect(typeof(retrieve.contact.lastName)).toEqual("string")
        expect(typeof(retrieve.contact.email)).toEqual("string")
        expect(typeof(retrieve.contact.address)).toEqual("string")
        expect(typeof(retrieve.contact.city)).toEqual("string")
        // un objet products with at least one product id
        expect(typeof(retrieve.products)).toEqual("object")
        expect(typeof(retrieve.products[0]._id)).toEqual("string")
        // une string orderId
        expect(typeof(retrieve.orderId)).toEqual("string")
    })

    it('Attempt to post incorrectly formatted data ', async () => {
        const postFixture = post_fixture_fake(localStorage)
        const apiLink = new APILink()
        const retrieve = await apiLink.post_contact(postFixture)
        expect(retrieve).toEqual(false)
    })

})