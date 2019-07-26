new Vue({
    el: "#app",
    data: {
        currencies: {},
        amount: null,
        from: 'EUR',
        to: 'USD',
        results: 0,
        loading : false
    },
    mounted() {
        this.getCurrencies();
    },
    methods: {
        getCurrencies() {
            axios.get('https://free.currconv.com/api/v7/currencies?apiKey=e8ebbc8a34fa97e0ac14')
                .then(response => {
                    this.currencies = response.data.results;
                    localStorage.setItem('currencies', JSON.stringify(response.data.results));
                });
            const currencies = localStorage.getItem('currencies');
            if (currencies) {
                this.currencies = JSON.parse(currencies);
                return;
            }
        },
        convertCurrency() {
            const params = `${this.from}_${this.to}`;
            this.loading = true;
            axios.get(`https://free.currconv.com/api/v7/convert?apiKey=e8ebbc8a34fa97e0ac14&q=${params}`)
                .then((response) => {
                    this.loading = false;
                    this.results = response.data.results[params].val;
                    console.log(this.results);
                })
        }
    },
    computed: {
        formattedCurrencies() {
            return Object.values(this.currencies);
        },
        calculateResult() {
            return (Number(this.amount) * this.results).toFixed(3);
        },
        disabled() {
            return this.amount === 0 || !this.amount || this.loading;
        }
    },
    watch: {
        from() {
            this.results = 0;
        },
        to() {
            this.results = 0;
        }
    }
});