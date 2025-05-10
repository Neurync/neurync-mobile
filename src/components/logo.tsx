import { Image } from 'react-native';

export function Logo() {
	return (
		<Image
			style={{
				width: 250,
				height: 70,
			}}
			source={require('@/assets/images/splash-icon.png')}
		/>
	);
}
