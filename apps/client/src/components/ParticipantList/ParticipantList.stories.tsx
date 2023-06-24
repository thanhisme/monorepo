import { Meta, StoryObj } from '@storybook/react';
import { Participants } from 'shared';

import ParticipantList, { ParticipantListProps } from './ParticipantList';

export default {
	title: 'ParticipantList',
	component: ParticipantList,
	argTypes: {
		onClose: { action: 'closing ' },
		onRemoveParticipant: { action: 'removing participant' },
	},
	args: {
		isOpen: true,
		isAdmin: false,
	},
} as Meta<typeof ParticipantList>;

const participants: Participants = {
	'1': 'Jeannie',
	'2': 'Ryan',
	'3': 'Ayalen',
	'4': 'Giuseppe',
	'5': 'Sara',
};

type Story = StoryObj<typeof ParticipantList>;

const render = (args: ParticipantListProps) => (
	<div className="max-w-sm m-auto h-screen relative">
		<ParticipantList {...args} />
	</div>
);

export const Default: Story = {
	args: {
		participants,
		userID: '1',
	},
	render,
};
