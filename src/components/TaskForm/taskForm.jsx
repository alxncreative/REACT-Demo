import styles from "./taskForm.module.css";
import Button from "../Button/button";

function TaskForm(props) {
  return(
    <form className={styles.taskForm} onSubmit={props.onSubmit}>
      <input name="taskLabel" type="text" placeholder="Add a new task" />
      <Button isPrimary type="submit">Add Task</Button>
    </form>
  );
}

export default TaskForm;
