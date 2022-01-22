module.exports =
class PreferenceBuilder {
    constructor({ title, img, unit, price }) {
        this.title = title;
        this.img = img;
        this.unit = unit;
        this.price = price;
        this.expirationDateFrom(new Date());
    }

    expiringInDays(days) {
        let date = new Date(this._today);
        date.setDate(date.getDate() + days);
        const expirationDate = date.toISOString().split('T')[0];
        this._expirationDateTo = `${expirationDate}T00:00:00.000-04:00`
        return this;
    }

    maxInstallments(value) {
        this._maxInstallments = Number(value);
        return this;
    }

    set title(value) {
        this._title = value;
    }

    set img(value) {
        this._img = `${process.env.HOST}${value.substring(1)}`;
    }

    set unit(value) {
        this._unit = Number(value);
    }

    set price(value) {
        this._price = Number(value);
    }

    expirationDateFrom(date) {
        this._today = date;
        const today = date.toISOString().split('T')[0];
        this._expirationDateFrom = `${today}T00:00:00.000-00:00`;
        this._expirationDateTo = this._expirationDateFrom;
    }

    build() {
        return {
            items: [
                {
                    id: '1234',
                    title: this._title,
                    currency_id: 'BRL',
                    picture_url: this._img,
                    description: 'Celular de Tienda e-commerce',
                    category_id: 'phones',
                    quantity: this._unit,
                    unit_price: this._price
                }
            ],
            payer: {
                name: 'Lalo',
                surname: 'Landa',
                email: 'test_user_92801501@testuser.com',
                phone: {
                    area_code: '55',
                    number: 985298743
                },
                identification: {
                    type: 'CPF',
                    number: '19119119100'
                },
                address: {
                    street_name: 'Insurgentes Sur',
                    street_number: 1602,
                    zip_code: '78134190'
                }
            },
            back_urls: {
                success: `${process.env.HOST}/success`,
                failure: `${process.env.HOST}/failure`,
                pending: `${process.env.HOST}/pending`
            },
            auto_return: 'approved',
            payment_methods: {
                excluded_payment_methods: [
                    {
                        id: 'amex'
                    }
                ],
                excluded_payment_types: [
                    // {
                    //     id: 'ticket'
                    // }
                ],
                installments: this._maxInstallments
            },
            notification_url: 'https://webhook.site/c9c21ba9-df86-412e-8eeb-6805290c7ce9',
            statement_descriptor: 'Tienda e-commerce',
            external_reference: 'helioalb@gmail.com',
            expires: true,
            // expiration_date_from: this._expirationDateFrom,
            expiration_date_to: this._expirationDateTo
        }
    }
}
