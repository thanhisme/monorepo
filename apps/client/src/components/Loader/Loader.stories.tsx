import { Meta, StoryObj } from '@storybook/react';

import Loader from './Loader';

export default {
	title: 'Loader',
	component: Loader,
	argTypes: {
		color: {
			options: ['blue', 'orange', 'purple'],
			control: { type: 'select' },
		},
	},
} as Meta<typeof Loader>;

type Story = StoryObj<typeof Loader>;

export const Loading: Story = {
	args: {
		isLoading: true,
		color: 'purple',
		width: 80,
	},
};
