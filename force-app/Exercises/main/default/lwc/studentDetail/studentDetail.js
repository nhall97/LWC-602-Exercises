import { LightningElement, track, wire } from 'lwc';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import SELECTED_STUDENT_CHANNEL from '@salesforce/messageChannel/SelectedStudentChannel__c';
import { getRecord, getFieldValue, getFieldDisplayValue } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';

import FIELD_Name from '@salesforce/schema/Contact.Name';
import FIELD_Description from '@salesforce/schema/Contact.Description';
import FIELD_Email from '@salesforce/schema/Contact.Email';
import FIELD_Phone from '@salesforce/schema/Contact.Phone';

const fields = [FIELD_Name, FIELD_Description, FIELD_Email, FIELD_Phone];

export default class StudentDetail extends NavigationMixin(LightningElement) {

	studentId;
	@wire(MessageContext) messageContext;

	@wire(getRecord, { recordId: '$studentId', fields })
	wiredStudent;
	subscription;
	
	connectedCallback() {
		if(this.subscription){
			return;
		}
		this.subscription = subscribe(this.messageContext, SELECTED_STUDENT_CHANNEL, 
			message => {
				this.handleStudentChange(message);
			});
	}

	disconnectedCallback(){
		unsubscribe(this.subscription);
		this.subscription = null;
	}
	
	handleStudentChange(event) {
		this.studentId = event.studentId;
	}

	onGoToRecord(evt) {
		this[NavigationMixin.Navigate]({
			type: 'standard__recordPage',
			attributes: {
				recordId: this.studentId,
				actionName: 'view'
			},
		});
	}

	get name() {
		return this._getDisplayValue(this.wiredStudent.data, FIELD_Name);
	}
	get description() {
		return this._getDisplayValue(this.wiredStudent.data, FIELD_Description);
	}
	get phone() {
		return this._getDisplayValue(this.wiredStudent.data, FIELD_Phone);
	}
	get email() {
		return this._getDisplayValue(this.wiredStudent.data, FIELD_Email);
	}
	_getDisplayValue(data, field) {
		return getFieldDisplayValue(data, field) ? getFieldDisplayValue(data, field) : getFieldValue(data, field);
	}
	
}