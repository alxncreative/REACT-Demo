import classNames from 'classnames';
import styles from "./button.module.css";

function Button(props) {
	const { children, onClick, type } = props;

	 // Always start with base class
  const classes = [
    'button',
    ...Object.keys(props).filter(key => key.startsWith('isStyle') && props[key])
  ].map(key=>styles[key]);

	return (
		<button className={classes.join( ' ' )} onClick={onClick} type={ type ? type : 'button' }>
			{children}
    </button>
	);
}

export default Button;
