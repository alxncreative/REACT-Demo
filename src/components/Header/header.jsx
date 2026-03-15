function Header(props) {
  const Tag = props.tagType;

  return(
    <header>
      <Tag className="task-title">{props.title}</Tag>
    </header>
  );
}

export default Header;
