import styles from "./button.module.css";

function Button(props) {
	let classes = [ styles.button  ];
	const { destructive, isPrimary, isSecondary, isSimple, isOutline, children, onClick, type } = props;

	if (destructive) classes.push(styles.isDestructive);
	if (isPrimary) classes.push(styles.isPrimary);
	if (isSecondary) classes.push(styles.isSecondary);
	if (isSimple) classes.push(styles.isSimple);
	if (isOutline) classes.push(styles.isOutline);

	return (
		<button className={classes.join(' ')} onClick={onClick} type={ type ? type : 'button' }>
			{children}
    </button>
	);
}

export default Button;
