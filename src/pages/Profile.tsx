import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonCard,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonCardContent,
	IonItem,
	IonIcon,
	IonLabel,
	IonButton,
	IonButtons,
	IonMenuButton,
	IonFab,
	IonFabButton,
	IonRouterOutlet,
} from '@ionic/react';
import React, { useState } from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { pin, wifi, wine, warning, walk } from 'ionicons/icons';
import { useParams } from 'react-router';
import './Page.css';
import SubHeading from '../components/SubHeading';
import Menu from '../components/Menu';
import VoteCard from '../components/VoteCard';
import MenuButton from '../components/MenuButton';
import NebenCard from '../components/NebenCard';
import KontroCard from '../components/KontroCard';
import PoliticianProfile from '../components/PoliticianProfile';
import Votes from '../pages/Votes';
import './Profile.css';
import {Candidate} from '../Types'

// Hardcoded Kontroversen until we connect to our API
const kontros = [
	{
		label: "Lobbyismus-Affäre",
		articles: [
			{
				label:
					"Geschäftsführer von Augustus Intelligence lässt Amt ruhen",
				image:
					"https://cdn.prod.www.spiegel.de/images/e4f16506-cc40-4023-a068-8c33a57bf098_w948_r1.77_fpx39.81_fpy49.98.jpg",
				url:
					"https://www.spiegel.de/wirtschaft/unternehmen/affaere-um-philipp-amthor-geschaeftsfuehrer-von-augustus-intelligence-laesst-amt-ruhen-a-6577f286-2dc0-4f74-a08c-a2536e86a87d",
				publisher: "spiegel",
			},
			{
				label:
					"Für diese merkwürdige Firma hat sich Philipp Amthor engagiert",
				image:
					"https://www.handelsblatt.com/images/philipp-amthor/25914394/3-format2020.jpg",
				url:
					"https://www.handelsblatt.com/politik/deutschland/augustus-intelligence-fuer-diese-merkwuerdige-firma-hat-sich-philipp-amthor-engagiert/25914246.html?ticket=ST-630502-PMl5Lfyb2kItmkRSq1QJ-ap6",
				publisher: "handelsblatt",
			},
			{
				label: "Verfahren gegen Philipp Amthor eingestellt",
				image:
					"https://img.zeit.de/politik/deutschland/2020-07/philipp-amthor-staatsanwaltschaft-lobbyismus-bestechlichkeit-ermittlungen-eingestellt-bild/wide__820x461__desktop",
				url:
					"https://www.zeit.de/politik/deutschland/2020-07/philipp-amthor-lobby-affaere-staatsanwaltschaft-bestechlichkeit-ermittlungen-eingestellt",
				publisher: "zeit-online",
			},

		],
	},
	{
		label: '"Hey Rezo, du alter Zerstörer!"',
		articles: [
			{
				label: 'Amthor zur fehlenden Videoantwort der CDU auf Rezo',
				image:
					"https://i.ytimg.com/vi/DEKzmztBZNI/maxresdefault.jpg",
				url:
					"https://www.youtube.com/watch?v=DEKzmztBZNI",
				publisher: "tagesschau",
			},
			{
				label: "CDU-Antwort an YouTuber Rezo doch nicht im Netz",
				image:
					"https://www.tagesspiegel.de/images/philipp-amthor-mdb-cdu-bundestagsabgeordneter-aus-mecklenburg-vorpommern-fotografiert-im-tunnel-zwischen-reichstag-und-paul-loebe-haus-in-berlin-foto-mike-wolff/25035974/1-format43.jpg",
				url:
					"https://www.tagesspiegel.de/politik/amthor-bleibt-video-schuldig-cdu-antwort-an-youtuber-rezo-doch-nicht-im-netz/25035964.html",
				publisher: "tagesspiegel",
			},
			{
				label: "Amthor verrät Satz aus Video Antwort",
				image:
					"https://www.zdf.de/assets/philipp-amthor-106~1280x720?cb=1559819231142",
				url:
					"https://www.zdf.de/nachrichten/heute-sendungen/videos/philipp-amthor-verraet-ersten-satz-aus-antwort-video-an-rezo-bei-markus-lanz-100.html",
				publisher: "zdf",
			},
			{
				label: "CDU-Mann Amthor verblüfft mit Blödel-Auftritt",
				image:
					"https://bilder.t-online.de/b/88/06/90/98/id_88069098/tid_da/der-27-jaehrige-bundestagsabgeordnete-philipp-amthor-galt-als-nachwuchshoffnung-der-cdu-.jpg",
				url:
					"https://www.bild.de/politik/inland/politik-inland/philipp-amthor-cdu-kuendigt-bei-markus-lanz-antwort-auf-rezo-video-an-aber-64827894.bild.html",
				publisher: "bild",
			},
			{
				label: "CDU-Antwort an Rezo doch nicht im Netz",
				image:
					"https://www.wz.de/imgs/39/6/7/6/2/2/5/8/7/tok_9493083746e31342f0314db3fd137b7f/w1900_h1052_x1985_y745_MDB_2195_116329216-965890a82ac6efee.jpg",
				url:
					"https://www.wz.de/politik/cdu-antwort-an-rezo-doch-nicht-im-netz-amthor-bleibt-video-schuldig_aid-45960339",
				publisher: "westdeutsche-zeitung",
			},
		],
	},
];

/* Hardcoded for now until passed in from the API */

const nebens = [
	{
		subtitle: "Mitglied des Verwaltungsrates",
		title: "Sparkasse Uecker-Randow",
	},
];

// Hardcoded votes until we connect to our API
const votes = [
	{
		subtitle: 'Beschlussempfehlung',
		title: 'Bundeswehreinsatz in Afghanistan',
		candidateVote: 'yes',
		chip: {
			name: 'Verteidigung',
			icon: 'assets/icon/shield-light.svg'
		},
		abstract: 'Beschlussempfehlung des auswärtigen Ausschusses zum Antrag der Regierung: Fortsetzung der Beteiligung bewaffneter deutscher Streitkräfte am Nato-geführten Einsatz. Support für die Ausbildung, Beratung und Unterstützung der afghanischen Verteidigung- und Sicherheitskräfte im Land.',
		reason: 'Dem Beschluss wird zugestimmt, da ein strategisches Interesse vorliegt. Zudem stärkt der Einsatz der Bundeswehr die Demokratie in der Region.',
		result: {
			total: {
				yes: 356,
				no: 159,
				abstain: 21,
				none: 173,
			},
			partyResult: [
				{
					partyName:  'CDU/CSU',
					yes: 200,
					no: 0,
					abstain: 0,
					none: 46,
					partyTotal: 246,
				},
			],
		},
	},
];
interface ProfileProps {
	candidate: Candidate;
}

/* Define the React component (FC stands for Functional Components, as opposed to class-based components) */
const Profile: React.FC<ProfileProps> = ({
	candidate
}) => {
	
	/* Here we define the variable 'name' to be used as a parameter in components */
	const { id } = useParams<{ id: string }>();

	const [polls, setPolls] = useState(votes);

	/* This is returned when using this component */
	return (
		<IonPage>
			{" "}
			{/* Page Tag */}
			<IonHeader>
				{" "}
				{/* Header Tag */}{" "}
				{/* Toolbar tag, this is the title bar / top bar */}
			</IonHeader>
			{/* Here the content of our page starts */}
			<IonContent>
				{/* ProfileImg component that holds all the images of the politicians. 
				Right now the name property is not being used, maybe it's an idea to dynamically pass in images 
				to make our life easier when we add the profiles images of new politicians.
				The politicans name is included on the ProfileImg */}
				<div className="profile-header">
					<PoliticianProfile politician={candidate} />

					{/* Here we include the Fab menu button */}
					<IonFab vertical="top" horizontal="end">
						<MenuButton />
					</IonFab>
				</div>

				{/* Subheading-button created by using a div for the background color and placing a button over part of it*/}

				<div
					className="subheading-button-underlay"
					data-testid="profile-subheading-votes"
				>
					<SubHeading
						name="Abstimmungsverhalten >"
						icon="infobutton.svg"
						buttonAction={`/politician/${id}/votes`}
					/>
				</div>

				<div className="grey-back">
					{/* For each vote in votes, render a VoteCard component */}
					{polls.map((poll, index) => {
						return <VoteCard vote={poll} key={index} />;
					})}
				</div>

				{/* Pass name to Subheading to be in control of the sub heading text */}

				<div data-testid="profile-subheading-controversies">
					<SubHeading name="Kontroversen" icon="infobutton.svg" />
				</div>

				<div className="grey-back">
					{/* For each item in kontro, render a KontroCard component */}
					{kontros.map((kontro, index) => {
						return <KontroCard kontro={kontro} key={index} />;
					})}
				</div>

				<div data-testid="profile-subheading-sidejobs">
					<SubHeading
						name="Bekannte Nebentätigkeiten"
						icon="infobutton.svg"
					/>
				</div>

				<div className="last-grey-back">
					{/* For each item in title, render a NebenCard component */}
					{nebens.map((neben, index) => {
						return <NebenCard neben={neben} key={index} />;
					})}
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Profile;
