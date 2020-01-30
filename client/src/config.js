var url = process.env.NODE_ENV=="production" ? "https://featurevoting.herokuapp.com" : "http://localhost:3000"
const CLIENT_ID = process.env.CLIENT_ID_1 || "596132698210-554c0ihpr0kp9vg13v7irajr55v8m4eq.apps.googleusercontent.com"
export default{
    url,
    CLIENT_ID
}

