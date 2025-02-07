/** @format */

import Image from 'next/image';
import logo1 from '../../../assets/logos-partners/image 10.png';
import logo2 from '../../../assets/logos-partners/image 9.png';
import logo3 from '../../../assets/logos-partners/image 8.png';
import logo4 from '../../../assets/logos-partners/image 6.png';
import logo5 from '../../../assets/logos-partners/image 12.png';
import logo6 from '../../../assets/logos-partners/image 5.png';
import logo7 from '../../../assets/logos-partners/image 16.png';
import logo8 from '../../../assets/logos-partners/image 15.png';
import logo9 from '../../../assets/logos-partners/image 14.png';
import logo10 from '../../../assets/logos-partners/image 13.png';

import { InfiniteSlider } from '@/components/ui/infinite-slider';

export default function CTAClub() {
	return (
		<div className='py-10 max-w-7xl w-full items-center h-full flex flex-col mx-auto gap-10 justify-between z-10 relative text-center md:text-left'>
			<div className='flex flex-col gap-5 items-center justify-center mx-4'>
				<h2 className='font-semibold text-3xl xl:text-4xl md:text-balance capitalize md:leading-loose max-w-xl text-center'>
					Cuide da Saúde e Aproveite os Melhores Descontos
				</h2>
				<p className='text-balance text-center max-w-3xl'>
					Contratando o plano de telemedicina, você terá acesso ao clube de
					vantagens, desfrutando de descontos de até 60% em grandes redes
				</p>
			</div>
			<div className='flex items-center justify-center gap-10 2xl:gap-20 w-full flex-col-reverse md:flex-row'>
				<div className='flex h-[480px] space-x-5 w-full px-4'>
					<InfiniteSlider
						gap={80}
						direction='vertical'
						className='w-full'>
						<Image
							alt='telemedicina'
							width={1200}
							height={1000}
							src={logo1}
							className='object-cover object-center rounded-xl max-w-[140px]  hover:scale-105 transition-all ease-in-out duration-300 '></Image>{' '}
						<Image
							alt='telemedicina'
							width={1200}
							height={1000}
							src={logo2}
							className='object-cover object-center rounded-xl max-w-[140px]  hover:scale-105 transition-all ease-in-out duration-300'></Image>{' '}
						<Image
							alt='telemedicina'
							width={1200}
							height={1000}
							src={logo3}
							className='object-cover object-center rounded-xl max-w-[140px]  hover:scale-105 transition-all ease-in-out duration-300'></Image>{' '}
						<Image
							alt='telemedicina'
							width={1200}
							height={1000}
							src={logo4}
							className='object-cover object-center rounded-xl max-w-[140px]  hover:scale-105 transition-all ease-in-out duration-300'></Image>
						<Image
							alt='telemedicina'
							width={1200}
							height={1000}
							src={logo5}
							className='object-cover object-center rounded-xl max-w-[140px]  hover:scale-105 transition-all ease-in-out duration-300'></Image>{' '}
					</InfiniteSlider>
					<InfiniteSlider
						gap={80}
						className='w-full '
						direction='vertical'
						reverse>
						<Image
							alt='telemedicina'
							width={1200}
							height={1000}
							src={logo6}
							className='object-cover object-center rounded-xl max-w-[140px]  hover:scale-105 transition-all ease-in-out duration-300'></Image>{' '}
						<Image
							alt='telemedicina'
							width={1200}
							height={1000}
							src={logo7}
							className='object-cover object-center rounded-xl max-w-[140px]  hover:scale-105 transition-all ease-in-out duration-300'></Image>{' '}
						<Image
							alt='telemedicina'
							width={1200}
							height={1000}
							src={logo8}
							className='object-cover object-center rounded-xl max-w-[140px]  hover:scale-105 transition-all ease-in-out duration-300'></Image>{' '}
						<Image
							alt='telemedicina'
							width={1200}
							height={1000}
							src={logo9}
							className='object-cover object-center rounded-xl max-w-[140px]  hover:scale-105 transition-all ease-in-out duration-300'></Image>{' '}
						<Image
							alt='telemedicina'
							width={1200}
							height={1000}
							src={logo10}
							className='object-cover object-center rounded-xl max-w-[140px]  hover:scale-105 transition-all ease-in-out duration-300'></Image>
					</InfiniteSlider>
				</div>
				<div className='xl:p-10 px-4 py-10 text-slate-50 bg-gradient-to-br from-blue-600 to-blue-950 w-full h-full rounded-xl flex  flex-col gap-5'>
					<h3 className='font-semibold text-3xl xl:text-4xl md:text-balance capitalize'>
						Descontos de até 60% em grandes redes
					</h3>
					<p className='font-light text-base mb-5 text-left'>
						<strong className='font-semibold'>Precisa de medicamentos?</strong>
						<br />
						Compre nas farmácias como DrogaRaia, Pacheco, Venâncio, com
						descontos de até 60%.
					</p>
					<p className='font-light text-base mb-5 text-left'>
						<strong className='font-semibold'>Curte cinema?</strong> <br />
						Compre entradas para Cinemark com descontos de até 60%, pra você e
						seus amigos.
					</p>
					<p className='font-light text-base mb-5 text-left'>
						São mais de 30 mil estabalecimentos conveniados:
					</p>
				</div>
			</div>
		</div>
	);
}
