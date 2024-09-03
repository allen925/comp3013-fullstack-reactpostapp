import { Container, Group, Anchor } from '@mantine/core';
import classes from './Footer.module.css';
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo"

const links = [
  { link: '#', label: 'Contact' },
  { link: '#', label: 'Privacy' },
  { link: '#', label: 'Blog' },
  { link: '#', label: 'Careers' },
];

const Footer = ({ isHomePage }) => {
  const navigate = useNavigate();
  const footerClass = isHomePage ? `${classes.footer} ${classes.noMarginT}` : `${classes.footer}`;
  const items = links.map((link) => (
    <a
      c="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </a>
  ));

  return (
    <div className={footerClass}>
      <Container className={classes.inner}>
        <Logo size={34} onClick={() => { navigate("/") }} style={{ cursor: "pointer" }} />
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}

export default Footer;
