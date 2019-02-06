const needle = require("needle");
const cheerio = require("cheerio");

var arrURL = [];
arrURL[0] = "https://www.asos.com/ru/asos-design/bordovyj-oblegayuschij-velyurovyj-svitshot-v-stile-kolor-blok-asos-design/prd/10539536?clr=krasnyj&SearchQuery=&cid=8409&gridcolumn=1&gridrow=1&gridsize=4&pge=1&pgesize=72&totalstyles=20809";

arrURL[1] = "https://www.asos.com/ru/puma/krasnyj-hudi-iz-pererabotannogo-poliestera-v-kletku-puma-eksklyuzivno-dlya-asos/prd/10849601?clr=krasnyj&SearchQuery=&cid=8409&gridcolumn=2&gridrow=1&gridsize=4&pge=1&pgesize=72&totalstyles=20838";

arrURL[2] = "https://www.asos.com/ru/asos-design/zheltyj-obtyagivayuschij-svitshot-so-vstavkoj-u-nizhnego-kraya-asos-design/prd/10252034?clr=jarlsberg-white&SearchQuery=&cid=8409&gridcolumn=3&gridrow=1&gridsize=4&pge=1&pgesize=72&totalstyles=20838";

function getPage(url) {
	return new Promise(function (resolve) {
		needle.get(url, function (err, res) {
			if (err) throw (err);
			var $ = cheerio.load(res.body);
			var title = $("h1").text();
			console.log(title);
			var brand = $(".schema-org span").eq(3).text();
			console.log(brand);
			var productID = $(".schema-org span").eq(1).text();
			console.log(productID);

			var img = $(".thumbnails img");
			img.each(function (i, val) {
				image = $(val).attr("src").replace("S", "XXL").replace("=40", "=513");
				console.log(image);
			});
			resolve(productID);
		})
	});
}

function getData(productID) {
	var dataURL = "https://www.asos.com/api/product/catalogue/v2/products/" + productID + "?currency=RUB&keyStoreDataversion=fcnu4gt-12&lang=ru-RU&sizeSchema=RU&store=RU"
	needle.get(dataURL, function (err, res) {
		if (err) throw (err);
		var data = JSON.stringify(res.body);
		var size = JSON.stringify(res.body.variants[1].sizeId);
		console.log(size);
		
	})
}
function getPrice(productID) {
	var priceURL = "https://www.asos.com/api/product/catalogue/v2/stockprice?productIds=" + productID + "&currency=RUB&keyStoreDataversion=fcnu4gt-12&store=RU";
	needle.get(priceURL, function (err, res) {
		if (err) throw (err);
		var currentPrice = JSON.stringify(res.body[0].productPrice.current.value)
		var previousPrice = JSON.stringify(res.body[0].productPrice.previous.value)
		console.log(currentPrice);
		console.log(previousPrice);
	})
}

i = 0;
while (i < arrURL.length) {
	getPage(arrURL[i])
		.then(res => { return res })
		.then(res => {
			getPrice(res)
			return res;
		})
		.then(res => { getData(res) });
	i++;
}
