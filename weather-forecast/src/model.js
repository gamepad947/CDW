var model = (function () {
	function getLocation(success, error) {
		if (navigator.geolocation) {

			navigator.geolocation.getCurrentPosition(success, error)
		} else {
			console.log('No location detected');
		}

	};
	function query(url) {
		fetch(url)
			.then(function (response) {
				if (response.ok) {
					return response.json()
				}
			})
			.then(function (data) {
				view.render(data)
				console.log(data);
				return data;
			})

	}
	return {
		getLocation,
		query
	}
})();

