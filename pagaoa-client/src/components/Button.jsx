import { Link } from "react-router-dom";

const Button = ({
  children,
  to,
  type = "button",
  variant = "gold",
  className = "",
  onClick,
  disabled = false,
}) => {
  const classes = ["btn", variant === "outline" ? "btn-outline" : variant === "ghost" ? "btn-ghost" : "btn-gold", className]
    .filter(Boolean)
    .join(" ");

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
