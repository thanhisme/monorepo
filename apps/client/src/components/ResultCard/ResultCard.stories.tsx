import { Meta, StoryObj } from '@storybook/react';

import ResultCard, { ResultCardProps } from './ResultCard';
import { Results } from 'shared';

export default {
	title: 'ResultCard',
	component: ResultCard,
} as Meta<typeof ResultCard>;

type Story = StoryObj<typeof ResultCard>;

const render = (args: ResultCardProps) => (
	<div className="max-w-sm m-auto h-screen">
		<ResultCard {...args} />
	</div>
);

const results: Results = [
	{
		nominationID: '1',
		score: 5.0,
		nominationText: 'Taco Bell',
	},
	{
		nominationID: '2',
		score: 2.56,
		nominationText: 'Del Taco',
	},
	{
		nominationID: '3',
		score: 2.4,
		nominationText: "Papa's Tacos",
	},
	{
		nominationID: '4',
		score: 1.55,
		nominationText: 'Los Taqueros Locos con Nombre Largo',
	},
	{
		nominationID: '5',
		score: 1.41,
		nominationText: 'El Vilsito',
	},
	{
		nominationID: '6',
		score: 1.11,
		nominationText: 'Tacos El Güero',
	},
	{
		nominationID: '7',
		score: 0.0,
		nominationText: 'Taqueria del Mercado',
	},
];

export const ResultCardLong: Story = {
	args: {
		results,
	},
	render,
};
