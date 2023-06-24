import { Meta, StoryObj } from '@storybook/react';

import ConfirmationDialog from './ConfirmationDialog';

export default {
	title: 'ConfirmationDialog',
	component: ConfirmationDialog,
	argTypes: {
		onCancel: { action: 'cancelling' },
		onConfirm: { action: 'confirming' },
	},
	args: {
		showDialog: true,
	},
} as Meta<typeof ConfirmationDialog>;

type Story = StoryObj<typeof ConfirmationDialog>;

export const BasicMessage: Story = {
	args: {
		message: 'The world will explode if you contine...',
	},
};
