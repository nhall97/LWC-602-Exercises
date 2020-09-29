import { LightningElement, api } from 'lwc';

export default class StudentTile extends LightningElement {
    @api selected = false;

    @api student = {
        Name: 'Nathan',
        PhotoUrl: '/services/images/photo/003B0FakePictId',
    };

    get tileSelected() {
        return this.selected ? "tile selected " : "tile";
        }

    studentClick(){
        alert(this.student.Name);
    }
}