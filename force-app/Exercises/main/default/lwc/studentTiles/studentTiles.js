import { LightningElement, api} from 'lwc';

export default class StudentTiles extends LightningElement {
<<<<<<< HEAD
    @api studentList = [];
    selectedStudentId = '';

    handleStudentSelected(event){
        this.selectedStudentId=event.detail.studentId;
    }
=======
	@api studentList = [];
	selectedStudentId = '';

	handleStudentSelected(event){
		this.selectedStudentId=event.detail.studentId;
	}
	
>>>>>>> SLN_04/01.END
}