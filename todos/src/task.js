export default class Task {
        constructor(taskId, title, description, date, dueDate, priority, notes, project, completionStatus) {
        	this.taskId = taskId;
            this.title = title;
            this.description = description;
            this.date = date;
            this.dueDate = dueDate;
            this.priority = priority;
            this.notes = notes;
            this.project = project;
            this.completionStatus = completionStatus;
        }
    }