import Echo from "laravel-echo";
import Pusher from "pusher-js";
import Cookies from "js-cookie";

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: "pusher",
  key: "adab038314b643762ff5",
  cluster: "ap2",
  forceTLS: true,
  encrypted: true,
  authEndpoint: "http://localhost:8081/broadcasting/auth",
  auth: {
    headers: {
      Authorization: "Bearer " + Cookies.get("access_token"),
    },
  },
});

export default echo;
