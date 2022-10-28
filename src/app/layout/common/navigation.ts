import { Navigation } from 'app/core/navigation/navigation.types';


export class TalkArtAppNavigation
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
			},
			{
				type: 'basic',
				icon: 'subscriptions',
				link: 'plans',
				title: 'Subscription Plan',
				id: 'plan',
			}
		],
		horizontal: [
			{
				type: 'basic',
				icon: 'people',
				link: 'users',
				title: 'Users',
				id: 'users',
			},
			{
				type: 'basic',
				icon: 'plan',
				link: 'plan',
				title: 'Subscription Plan',
				id: 'plan',
			}
		]
	};
}
