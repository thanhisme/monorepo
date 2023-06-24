import { Nominations } from 'shared';
import { Meta, StoryObj } from '@storybook/react';

import NominationForm, { NominationFormProps } from './NominationForm';

export default {
	title: 'NominationForm',
	component: NominationForm,
	argTypes: {
		onClose: { action: 'closing' },
		onSubmitNomination: { action: 'submitting nomination' },
		onRemoveNomination: { action: 'removing nomination' },
	},
	args: {
		userID: '1',
		isAdmin: false,
	},
} as Meta<typeof NominationForm>;

const nominations: Nominations = {
	item1: {
		userID: '1',
		text: 'Nominanationaroo 1',
	},
	item2: {
		userID: '2',
		text: 'Nominanationaroo 2',
	},
	item3: {
		userID: '3',
		text: 'Nominanationaroo 3',
	},
};

type Story = StoryObj<typeof NominationForm>;

const render = (args: NominationFormProps) => (
	<div className="max-w-sm m-auto h-screen relative">
		<NominationForm {...args} />
	</div>
);

export const Default: Story = {
	args: {
		title: 'Nomination Formaroo!',
		isOpen: true,
		nominations,
	},
	render,
};
