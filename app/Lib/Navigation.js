'use strict'
const Categories = use('App/Models/Category')

async function Navigation(){

    const categories = await Categories.query().where('show',1).fetch()

    const bundling = {
        label: "Bundling Product",
        path: `/bundling`
    }
    const cat = [];
    for (const category of categories.rows) {
        cat.push({
            label: category.category,
            path: `/categories/${category.category_slug}`
        })
    }
    cat.push({
        label: "Products",
        path: `/products`
    })
    cat.push(bundling)
    

    const nav = {
        call_us: "081296979871",
        address: "Jl. Rawa Bahagia I no.12, Grogol, Petamburan, Jakarta Barat, 11450",
        email: "marketing@originbakery.id",
        navi : [
            {
                label: "Home",
                path: "/",
                selected: false,
                sub: []
            },
            {
                label: "Products",
                path: "#",
                selected: false,
                sub: cat
            },
            {
                label: "About Us",
                path: "#",
                selected: false,
                sub: [
                    {
                        label: "Who We Are",
                        path: "/who-we-are",
                    },
                    {
                        label: "Partnership",
                        path: "/partnership",
                    }
                ]
            },
            {
                label: "Wholesale/Whitelabel",
                path: "/wholesale",
                selected: false,
                sub: []
            },
            // {
            //     label: "Our Program",
            //     path: "/our-program",
            //     selected: false,
            //     sub: []
            // },
            {
                label: "News",
                path: "/news",
                selected: false,
                sub: []
            },

            // {
            //     label: "News",
            //     path: "/news",
            //     selected: false,
            //     sub: []
            // },
        ]


    }
    return nav
}

module.exports = Navigation
