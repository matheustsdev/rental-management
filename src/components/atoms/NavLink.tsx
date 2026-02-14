import Link from "next/link";

interface INavLinkProps {
  href: string;
  title: string;
  isActive: boolean;
  onClick?: () => void;
}

const NavLink: React.FC<INavLinkProps> = ({ href, title, isActive, onClick }) => {
  const activeColor = "var(--chakra-colors-secondary-500)";

  return (
    <Link
      onClick={onClick}
      href={href}
      style={
        isActive
          ? {
              fontWeight: "bold",
              textDecoration: "underline",
              color: activeColor,
              textDecorationColor: activeColor,
              pointerEvents: "none",
            }
          : undefined
      }
    >
      {title}
    </Link>
  );
};

export default NavLink;
