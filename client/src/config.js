<<<<<<< HEAD
var url = "http://localhost:3000";
export default {
  url
};
=======
var url = process.env.NODE_ENV=="production" ? "https://featurevotingdev.herokuapp.com" : "http://localhost:3000"
export default{
    url
}

>>>>>>> dev
