import Checkbox from "@assets/checkbox.svg?react";
import styles from "./task.module.css";

function Task({id, completed, taskText, onSelect}) {
  const baseClass = styles.taskItem;

  const setClass= () => {
    return completed? `${styles.taskItem} ${styles.completed}` : styles.taskItem;
  }

  console.log('completed', completed);

  return (
    <li onClick={onSelect} className={setClass()} key={id}>
      <input type="checkbox" checked={completed} />
      <Checkbox />
      <span>{taskText}</span>
    </li>
  );
}

export default Task;
