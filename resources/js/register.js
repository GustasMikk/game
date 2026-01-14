export default {
    name: "RegisterPage",
    data() {
        return{
            name: "",
            password: "",
            email: "",
            message: "",
            loading: false,
            recaptchaSiteKey: "6LetAEQsAAAAAKdJnJyVvgwNN3ThAqFaKdrpkrKh",
            loginUrl: "/",
        };   
    },
    mounted() {
        if (!document.getElementById("recaptcha-script")) {
        const script = document.createElement("script");
        script.id = "recaptcha-script";
        script.src = "https://www.google.com/recaptcha/api.js";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        }
    },
    methods: {
        async handleRegister() {
            this.message = "";
            const token = grecaptcha.getResponse();
            if (!token){
                this.message = "Please complete the CAPTCHA"
                return;
            }

            this.loading = true;

            try {
                const res = await fetch("api/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "applicaiton/json",
                    },
                    body: JSON.stringify({
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        "g-recaptcha-response": token,
                    }),
                });

                const json = await res.json();

                if (res.ok) {
                    this.message = "Registered successfuly! Redirecting...";
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 1000);
                }
            } catch (err){
                console.error(err);
                this.message = "Something went wrong";
                grecaptcha.reset();
            } finally{
                this.loading = false;
            }
        }
    }
};