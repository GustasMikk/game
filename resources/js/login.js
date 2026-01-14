export default {
  name: "LoginPage",
  data() {
    return {
      name: "",
      password: "",
      message: "",
      loading: false,
      recaptchaSiteKey: "6LetAEQsAAAAAKdJnJyVvgwNN3ThAqFaKdrpkrKh",
      registerUrl: "/register",
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
    async handleLogin() {
      this.message = "";
      const token = grecaptcha.getResponse();
      if (!token) {
        this.message = "Please complete the CAPTCHA";
        return;
      }

      this.loading = true;

      try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: this.name,
            password: this.password,
            "g-recaptcha-response": token,
          }),
        });

        const json = await res.json();

        if (res.ok) {
          localStorage.setItem("token", json.token);
          this.message = "Login successful";
          setTimeout(() => {
            window.location.href = "/game";
          }, 1000);
        } else {
          this.message = json.message || "Login failed";
          grecaptcha.reset();
        }
      } catch (err) {
        console.error(err);
        this.message = "Something went wrong";
        grecaptcha.reset();
      } finally {
        this.loading = false;
      }
    },
  },
};