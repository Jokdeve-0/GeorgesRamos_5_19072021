const Contact = require('../../src/js/class/Contact')
module.exports = {
    // Warning ! risk of breakage if the product is removed
    product_id(){ return "5be1ed3f1c9d44000030b061" },

    post_fixture_real(localStorage){
        const date = new Date()
        const contact = new Contact("nom","Prenom","email@fake.ok","99 rue du web",75000,"Paris","France",date.toLocaleDateString('fr-FR',{ year: 'numeric', month: 'numeric', day: 'numeric'}))
        const products = ["5be1ed3f1c9d44000030b061","5be1ed3f1c9d44000030b061","5be1ed3f1c9d44000030b061"]
        localStorage.setItem('contact',JSON.stringify(contact))
        localStorage.setItem('products',JSON.stringify(products))
        return {"contact":contact,"products":products}
    },
    post_fixture_fake(localStorage){
        const date = new Date()
        const contact = new Contact("","","","","","","","")
        const products = ["5be1ed3f1c","5b0030b061","f1c9d44000030b061"]
        localStorage.setItem('contact',JSON.stringify(contact))
        localStorage.setItem('products',JSON.stringify(products))
        return {"info":contact,"products":products}
    },
    post_fixture_null(localStorage){
        const contact = new Contact()
        const products = []
        localStorage.setItem('contact',JSON.stringify(contact))
        localStorage.setItem('products',JSON.stringify(products))
        return {"contact":contact,"products":products}
    },
    add_product_store: () => {
        const count = 1
        localStorage.setItem(`productAdd_${count}`,JSON.stringify({"_id":"5be1ed3f1c9d44000030b061"}))
        localStorage.setItem(`productAdd_${count+1}`,JSON.stringify({"_id":"5be1ed3f1c9d44000030b061"}))
        localStorage.setItem(`productAdd_${count+2}`,JSON.stringify({"_id":"5be1ed3f1c9d44000030b061"}))
    },
    code_html: (numberProducts = "") => {
        return `
        
        <body>
            <header>
                <div>
                    <a href="./"><img id="logo" src="./src/img/oriCam.png" alt="logo de l'entreprise Orinico" width="600" height="160"></a>
                </div>
                <nav>
                    <a class="linkIco" href="./">
                        <i class="fas fa-home"></i>
                        <span class="sm-hide">&nbsp;ACCEUIL</span>
                    </a>
                    <a class="linkIco" href="?page=basket">
                        <i class="fa fa-shopping-basket" aria-hidden="true" id="basket"><small id="count_product">${numberProducts}</small></i>
                        <span class="sm-hide">&nbsp;PANIER</span>
                    </a>
                </nav>
            </header>
        
            <main>
            </main>
        
            <footer>
                <div>
                    <nav>
                        <p>Others Orinoco</p>
                        <a class="linkIco" href="./"><i class="fas fa-camera-retro"></i></a>
                        <a class="linkIco" href="./"><i class="fas fa-paw"></i></a>
                        <a class="linkIco" href="./"><i class="fas fa-chair"></i></a>
                    </nav>
                    <nav>
                        <p>Liens sociaux</p>
                        <a class="linkIco" href="./"><i class="fab fa-facebook-square"></i></a>
                        <a class="linkIco" href="./"><i class="fab fa-twitter-square"></i></a>
                        <a class="linkIco" href="./"><i class="fab fa-instagram-square"></i></a>
                    </nav>
                </div>
                <h2>© 2021-2022 Orinoco <i class="fas fa-sync-alt ml-3" id="reload"></i></h2>
            </footer>
        
        </body>`
        
    }
}
