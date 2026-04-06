import { useRef, useEffect } from "react";
import CheckboxImg from "@assets/checkbox.svg?react";
import styles from "./task.module.css";
import Button from "../Button/button";
import SVGIcon from "../SVGIcon/SVGIcon";

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
    onMoveUp,
    onMoveDown,
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
      <div className={styles.taskItemActions}>
        <Button isStyleIcon onClick={onMoveUp}>
          <SVGIcon name="arrowUp" />
        </Button>
        <Button isStyleIcon onClick={onMoveDown}>
          <SVGIcon name="arrowDown" />
        </Button>
        <Button isStyleDestructive isStyleSecondary isStyleIcon onClick={onDelete}>
          <SVGIcon name="bin" />
        </Button>
      </div>
    </li>
  );
}

export default Task;
