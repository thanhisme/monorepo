import { Meta, StoryObj } from '@storybook/react';

import RankedCheckBox, { RankedCheckBoxProps } from './RankedCheckBox';

export default {
	title: 'RankedCheckBox',
	component: RankedCheckBox,
	argTypes: {
		onSelect: { action: 'selected' },
	},
} as Meta<typeof RankedCheckBox>;

type Story = StoryObj<typeof RankedCheckBox>;

const render = (args: RankedCheckBoxProps) => (
	<div className="h-screen max-w-sm m-auto">
		<RankedCheckBox {...args} />
	</div>
);

export const Ranked: Story = {
	args: {
		rank: 1,
		value: "Tim's tacos",
	},
	render,
};

export const Unranked: Story = {
	args: {
		value: "Tim's tacos",
	},
	render,
};
