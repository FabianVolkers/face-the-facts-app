import React from 'react';
import { IonChip, IonIcon, IonLabel } from '@ionic/react';
import './TopicCard.css';

const topics = [
	{
		name: 'Finanzen',
		icon: 'assets/icon/sack-dollar-light.svg',
		filter: '',
	},
	{
		name: 'Soziales',
		icon: 'assets/icon/user-friends-light.svg',
		filter: '',
	},
	{
		name: 'Verteidigung',
		icon: 'assets/icon/shield-light.svg',
		filter: '',
	},
];

const TopicCard: React.FC = () => {
	return (
		<div>
			{topics.map((topic, index) => {
				return (
					<IonChip className="topic-card" key={`topic-${index}`}>
						<IonIcon src={topic.icon} color="light" />
						<IonLabel data-testid="topic-name">{topic.name}</IonLabel>
					</IonChip>
				);
			})}
		</div>
	);
};

export default TopicCard;
