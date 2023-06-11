import { randomFillSync } from 'crypto';
import fs from 'fs';
import path from 'path';
import busboy from 'busboy';

const random = (() => {
	const buf = Buffer.alloc(16);
	return () => randomFillSync(buf).toString('hex');
})();

export default defineEventHandler((event) => {

	// if (event.req.method === 'POST') {
	// 	const bb = busboy({ headers: event.req.headers });
	// 	bb.on('file', (name, file, info) => {
	// 		const { filename, encoding, mimeType } = info;
	// 		const saveTo = path.join(
	// 			`assets/images/${new Date().toISOString().replace(/:/g, '-') + '-' + filename}`
	// 		);
	// 		file.pipe(fs.createWriteStream(saveTo));

	// 		console.log(
	// 			`File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
	// 			filename,
	// 			encoding,
	// 			mimeType
	// 		);
	// 		file.on('data', (data) => {
	// 			console.log(`File [${name}] got ${data.length} bytes`);
	// 		}).on('close', () => {
	// 			console.log(`File [${name}] done`);
	// 		});
	// 	});
	// 	bb.on('field', (name, val, info) => {
	// 		console.log(`Field [${name}]: value: %j`, val);
	// 	});
	// 	bb.on('close', () => {
	// 		event.res.writeHead(200, { Connection: 'close' });
	// 		event.res.end(`Изображение сохранено!`);
	// 	});
	// 	event.req.pipe(bb);
	// 	return;
	//}
});
