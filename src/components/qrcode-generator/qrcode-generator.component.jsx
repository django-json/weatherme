import React from 'react';
import QRCode from 'qrcode.react';
import moment from 'moment';

import './qrcode-generator.styles.scss';

const QRCodeGenerator = ({ reading }) => {
	
	const qrcodeContent = `
		DAY: ${moment(reading.date).format('dddd')}\n
		DATE & TIME: ${moment(reading.date).format('MMMM Do, h:mm a')}\n\n
		CUR. TEMP: ${reading.temperature.current}°\n
		MIN. TEMP: ${reading.temperature.min}°\n
		MAX TEMP: ${reading.temperature.max}°\n
		DESC: ${reading.temperature.description}\n\n
		HUM: ${reading.humidity}%\n
		WIND S: ${reading.wind.speed} km/h, ${reading.wind.deg}°
	`;

	return (
		<div className="qrcode">
			<QRCode
				value={qrcodeContent}
				fgColor="rgb(20,40,80)"
				size={250}
				level={"H"}
				includeMargin={true}
			/>
			<h2>Scan Me</h2>
		</div>
	);
};

export default QRCodeGenerator;