import path from 'path';
import multer from 'multer';
import { callNodeListener } from 'h3';
import moment from 'moment';
import { createProduct } from '~/server/database/repositories/productRepository';

export default defineEventHandler(async (event) => {

	const body = await readBody(event);

	console.log('body :>> ', body);

	try {
		const storage = multer.diskStorage({
			destination: (req, file, cb) => {
				cb(null, path.resolve(__dirname, '../../../', 'static'));
			},
			filename(req, file, cb) {
				cb(null, `${file.originalname}-${moment().format('DDMMYY-HHmmss_SSS')}`);
			},
		});

		const upload = multer({
			storage: storage,
			fileFilter: (req, file, cb) => {
				if (
					file.mimetype == 'image/png' ||
					file.mimetype == 'image/jpeg' ||
					file.mimetype === 'image/webp'
				) {
					cb(null, true);
				} else {
					cb(null, false);
				}
			},
		});

		await callNodeListener(
			// @ts-expect-error: Nuxt 3
			upload.single('image'),
			event.node.req,
			event.node.res
		);
		await createProduct(body);
		return 200;
	} catch (error) {
		console.log(error);
		return createError({
			statusCode: 500,
			statusMessage: 'Something went wrong.',
		});
	}
});
