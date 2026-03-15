import styles from "./taskForm.module.css";

function TaskForm(props) {
  return(
    <form className={styles.taskForm} onSubmit={props.onSubmit}>
      <input name="taskLabel" type="text" placeholder="Add a new task" />
      <button type="submit">Add</button>
    </form>
  );
}

export default TaskForm;
