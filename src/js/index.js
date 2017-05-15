// load global styling
require("../theme/index.scss");

import App from "./app.jsx";

document.addEventListener("DOMContentLoaded", function() {
	App.init({
		element : document.getElementById("app-container")
	});
});
