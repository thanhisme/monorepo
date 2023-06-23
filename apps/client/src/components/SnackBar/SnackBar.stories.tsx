import { Meta, StoryObj } from '@storybook/react';

import SnackBar from './SnackBar';

export default {
	title: 'SnackBar',
	component: SnackBar,
	argTypes: {
		onClose: { action: 'close-a-roo' },
	},
	args: {
		show: true,
		type: 'standard',
	},
} as Meta<typeof SnackBar>;

type Story = StoryObj<typeof SnackBar>;

export const Standard: Story = {
	args: {
		message: 'Something happened.',
		title: 'Heyo!',
	},
};

export const Error: Story = {
	args: {
		message: 'Something happened.',
		title: 'Heyo!',
		type: 'error',
	},
};

export const AutoClose: Story = {
	args: {
		message: 'Something happened.',
		title: 'Heyo!',
		autoCloseDuration: 2000,
	},
};
