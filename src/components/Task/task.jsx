import { useRef, useEffect } from "react";
import CheckboxImg from "@assets/checkbox.svg?react";
import BinImg from "@assets/bin.svg?react";
import styles from "./task.module.css";
import Button from "../Button/button";

function Task(props) {
  const baseClass = styles.taskItem;
  const {
    id,
    taskText,
    onSelect,
    onDelete,
    completed,
    onBlur,
    onChange,
    onTextClick,
    isUpdating
  } = props;

  const setClass= () => {
    return completed? `${styles.taskItem} ${styles.completed}` : styles.taskItem;
  }

  const spanRef = useRef(null);
  const inputRef = useRef(null);
  const containerRef = useRef(null)

  useEffect(() => {
    if (spanRef.current && inputRef.current) {
      inputRef.current.style.width = spanRef.current.offsetWidth + "px";
    }

    if (containerRef.current && inputRef.current) {
      containerRef.current.style.height = inputRef.current.offsetHeight + "px";
    }
  }, [taskText]);

  return (
    <li className={styles.taskListItem} key={id}>
      <div className={`taskItem ${setClass()}`}>
        <span onChange={onSelect}>
          <input onChange={onSelect} type="checkbox" checked={completed} />
          <CheckboxImg />
        </span>
          {isUpdating ? (
            <div className={styles.container} ref={containerRef}>
              <span ref={spanRef} className={styles.hiddenSizer}>{taskText || " "} </span>
              <input
                className={styles.updateInput}
                type="text"
                ref={inputRef}
                value={taskText}
                onChange={onChange}
                onBlur={onBlur}
                onKeyDown={
                  (e) => {
                    const endKeys = ["Enter", "Escape", "ArrowUp", "ArrowDown"];
                    endKeys.includes(e.key) && onBlur();
                  }
                }
                autoFocus />
            </div>
          ):(
            <span onClick={onTextClick}>{taskText}</span>
          )}
      </div>
      <Button destructive isSecondary isSimple onClick={onDelete}><BinImg /></Button>
    </li>
  );
}

export default Task;
