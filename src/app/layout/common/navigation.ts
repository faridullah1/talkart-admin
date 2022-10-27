import { Navigation } from 'app/core/navigation/navigation.types';


export class UbluxAppNavigation
{
    // main navigation
    public static navigation: Navigation = {
		default: [
			{
				type: 'basic',
				icon: 'people',
				link: 'users',
				title: 'Users',
				id: 'users',
			}
		],
		horizontal: [
			{
				type: 'basic',
				icon: 'people',
				link: 'users',
				title: 'Users',
				id: 'users',
			}
		]
	};
}
