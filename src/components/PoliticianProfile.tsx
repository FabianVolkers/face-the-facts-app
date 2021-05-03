import React from 'react';
import classnames from 'classnames';
import { IonGrid, IonRow, IonCol, IonChip, IonCardTitle } from '@ionic/react';
import './PoliticianProfile.css';
import { Politician } from '../Types';
import '../index.css';

interface ContainerProps {
	candidate: Politician;
}

const PoliticianProfile: React.FC<ContainerProps> = ({ candidate }: ContainerProps) => {
	const partyClassName = candidate.party.label.toLowerCase().replace(/\s/g, '');


	return (
		<div className="header">
			<IonGrid>
				<IonRow>
					<IonCol className="profile-image">
						<img
							className="politician-image"
							src='https://www.abgeordnetenwatch.de/sites/default/files/styles/opengraph_image/public/politicians-profile-pictures/philipp_amthor.jpg?itok=_-cUhevr'
							alt={candidate.label}
							data-testid="profile-img-url">
						</img>
					</IonCol>
					<IonCol className="profile-details">
						<div className="politician-name">
							<IonCardTitle>{candidate.label}</IonCardTitle>
						</div>
						<div className="politican-details">
							<IonChip className={classnames(
											'politician-detail',
											`${partyClassName}`)}>
								{candidate.party.label}
							</IonChip>
							{candidate.occupation !== null ?
								<IonChip className="politician-detail">
									{candidate.occupation}
								</IonChip>
							: null
							}
						</div>
					</IonCol>
				</IonRow>
			</IonGrid>
		</div>
	);
};

export default PoliticianProfile;
