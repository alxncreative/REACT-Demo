import styles from './TaskFilters.module.css';
import Button from '../Button/button';

function TaskFilters(props) {
	const TagType = props.tagType || 'p';
	return (
		<div className={styles.TaskFiltersContainer}>
			<TagType className={styles.taskFiltersTag}>{props.label}</TagType>
			<Button isStylePrimary type="button">Active</Button>
      <Button isStyleSecondary type="button">Completed</Button>
		</div>
	);
}

export default TaskFilters;
