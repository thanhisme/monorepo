import { StoryObj, Meta } from '@storybook/react';

import CountSelector, { CountSelectorProps } from './CountSelector';

export default {
	title: 'CountSelector',
	component: CountSelector,
	argTypes: {
		onChange: { action: 'count changed' },
	},
	args: {
		initial: 3,
		min: 0,
		max: 5,
		step: 1,
	},
} as Meta<typeof CountSelector>;

type Story = StoryObj<typeof CountSelector>;

const render = (args: CountSelectorProps) => (
	<div className="h-screen max-w-sm m-auto">
		<CountSelector {...args} />
	</div>
);

export const Default: Story = {
	render,
};

export const Inc2: Story = {
	args: {
		step: 2,
	},
	render,
};
