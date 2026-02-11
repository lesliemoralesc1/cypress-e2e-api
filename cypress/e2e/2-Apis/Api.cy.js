describe('Pruebas de API con Cypress', () => {
    it('El endpoind post responde con status 200', () => {
        cy.request('https://jsonplaceholder.typicode.com/posts').then((response) => {
            expect(response.status).to.equal(200)
        })

    })
    it('El endponid post tiene 100 elementos', () => {
        /* cy.request('https://jsonplaceholder.typicode.com/posts').then((response) => {
             expect(response.body).to.have.length(100)
         })*/
        cy.request('https://jsonplaceholder.typicode.com/posts').its('body').should('have.length', 100)
    })
    it('El endpoind post 1, tiene por titulo "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"', () => {
        cy.request('https://jsonplaceholder.typicode.com/posts/1')
            .its('body')
            .should('have.property', 'title', 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit')

        /* cy.request('https://jsonplaceholder.typicode.com/posts/1')
             .its('body')
             .should('have.property', 'title')
             .and('equal', 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit')
 
         cy.request('https://jsonplaceholder.typicode.com/posts/1').then((response) => {
             expect(response.body).to.have.property('title', 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit')
         })*/
    })
    /*
        it('El POST de un nuevo post responde con status 201', () => {
            cy.request('POST', 'https://jsonplaceholder.typicode.com/posts', {
                title: 'foo',
                body: 'bar',
                userId: 1,
            }).then((response) => {
                expect(response.status).to.equal(201)
                expect(response.body).to.have.property('id', 101)
                expect(response.body).to.have.property('title', 'foo')
                expect(response.body).to.have.property('body', 'bar')
                expect(response.body).to.have.property('userId', 1)
            })
        
        })
        it('El PUT funciona correctamente para el endpoint', () => {
            cy.request('PUT', 'https://jsonplaceholder.typicode.com/posts/1', {
                title: '1 updated title',
                body: '1 updated body',
            }).then((response) => {
                expect(response.status).to.equal(200)
                expect(response.body).to.have.property('title', '1 updated title')
                expect(response.body).to.have.property('body', '1 updated body')
            })
        
        })*/
    it('El DELETE funciona correctamente para el endpoint', () => {
        cy.request('DELETE', 'https://jsonplaceholder.typicode.com/posts/2').its('status').should('equal', 200)
        /*cy.request('DELETE', 'https://jsonplaceholder.typicode.com/posts/2').then((response) => {
            expect(response.status).to.equal(200)                           
        })*/
    })
    it.only('Simula la solicitud GET a /posts con Stub', () => {

        //Datos de prueba para el stub
        const stubData = [
            {
                userId: 3,
                id: 3,
                title: 'Post 3',
                body: 'Contenido del post 3',
            },
            {
                userId: 4,
                id: 4,
                title: 'Post 4',
                body: 'Contenido del post 4',
            }
        ];
        //Intercepción de la solicitud GET a /posts y respuesta con el stub
        cy.intercept('GET', 'https://jsonplaceholder.typicode.com/posts', stubData).as('getPosts')

        //Visita la página que hace la solicitud GET a /posts
        cy.visit('https://jsonplaceholder.typicode.com')
        cy.get('body>div>main>table:nth-child(9)>tbody>tr:nth-child(1)>td:nth-child(2)>a').click()

        //Espera a que la solicitud GET a /posts
        cy.wait('@getPosts'),

        //Verifica que la respuesta de la solicitud GET a /posts sea el stub
        cy.get('.post-title').eq(0).should('contain', 'Post 3');
        cy.get('.post-body').eq(0).should('contain', 'Contenido del post 3');
        cy.get('.post-title').eq(1).should('contain', 'Post 4');
        cy.get('.post-body').eq(1).should('contain', 'Contenido del post 4');

    })
})