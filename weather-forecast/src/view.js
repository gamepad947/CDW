var view = (function () {
	function render(data) {

		var location = document.getElementById("location");
		var temperature = document.getElementById("temperature");


		location.innerText = data.name;
		temperature.innerText = data.main.temp + " C";
	}
	return {
		render
	}
})();