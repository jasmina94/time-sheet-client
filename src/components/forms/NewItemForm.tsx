import '../../assets/css/Styles.css';

import { ClientForm } from './ClientForm';
import { ProjectForm } from './ProjectForm';

export const NewItemForm = (props: any) => {
	const renderFormContent = () => {
		switch (props.formType) {
			case 'client':
				return <ClientForm />
			case 'project':
				return <ProjectForm />
		}
	}
	return (
		<div className="new-member-wrap">
			<div id="new-member" className="new-member-inner">
				{renderFormContent()}
			</div>
		</div>
	)
};