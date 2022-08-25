//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { PORT } = process.env;
const { Product } = require('./src/db.js');
const { preload } = require('./src/Controllers/Products_C.js');
// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
	const allInfo = await Product.findAll();
	if (!allInfo.length) {
		await preload();
	}
	server.listen(PORT, () => {
		console.log(`%s listening at ${process.env.PORT}`); // eslint-disable-line no-console
	});
});
