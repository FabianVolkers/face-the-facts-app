import React from "react";
import { IonButton, IonFabButton, IonFab } from "@ionic/react";
import "./SubHeading.css";

interface SubheadingProps {
	icon?: string;
	button?: string;
	name: string;
}

/* This is just a simple component to repeat the subheading wherever we need it */
const SubHeading: React.FC<SubheadingProps> = ({ name, button, icon }) => {
	var heading = null;
	var headingIcon = null;

	if (button !== undefined) {
		heading = (
			<IonButton className="sub-heading-button">
				<strong>{name}</strong>
			</IonButton>
		);
	} else {
		heading = <strong>{name}</strong>;
	}

	if (icon !== undefined) {
		const iconSrc = `../assets/icon/${icon}`;
		headingIcon = (
			<IonFab horizontal="end" slot="fixed" className="scrollhidden">
				<IonFabButton className="info-button">
					<img src={iconSrc} />
				</IonFabButton>
			</IonFab>
		);
	}

	return (
		<div className="sub-heading">
			{heading}
			{headingIcon}
		</div>
	);
};

export default SubHeading;
