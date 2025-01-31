import React from 'react'
import QRCode from 'react-qr-code';

export default function QrCode({value}:{value:string}) {
  return (
		
			<QRCode
				size={256}
				style={{ height: 'auto', maxWidth: '100px', width: '100%' }}
				value={value}
				viewBox={`0 0 256 256`}
			/>
		
	);
}
