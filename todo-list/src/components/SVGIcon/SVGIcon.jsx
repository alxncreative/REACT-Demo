const modules = import.meta.glob("@/assets/*.svg", { import:"default", query:"?react", eager: true });
const formatted = Object.fromEntries(
		Object.entries(modules).map(([path, loader]) => {
			const match = path.match(/\/([^\/]+)\.svg$/)
			const name = match ? match[1] : path
			return [name, loader]
		})
	)

export default function SVGIcon(props) {
	const Component = formatted[props.name]

  if (!Component) {
    console.warn(`Icon "${props.name}" not found`);
    return null;
  }

  return <Component {...props} />
}
