function TaskList(props) {
  return(
    <ul className='task-list'>
      {props.children}
    </ul>
  );
}

export default TaskList;
