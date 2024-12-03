import { r as reactExports, R as React } from './bundle.js';

const Header = () => {
  reactExports.useEffect(() => {
    const handleAnchorClick = e => {
      const targetId = e.currentTarget.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    };
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => anchor.addEventListener('click', handleAnchorClick));
    return () => {
      anchors.forEach(anchor => anchor.removeEventListener('click', handleAnchorClick));
    };
  }, []);
  return /*#__PURE__*/React.createElement("header", {
    className: "header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header__container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header__logo"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#main"
  }, /*#__PURE__*/React.createElement("img", {
    src: "/assets/eduhub.webp",
    alt: "Logotype EduHub"
  }))), /*#__PURE__*/React.createElement("nav", {
    className: "header__menu menu"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "menu__list"
  }, /*#__PURE__*/React.createElement("li", {
    className: "menu__item"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#main",
    className: "menu__link"
  }, "\u0413\u043B\u0430\u0432\u043D\u0430\u044F")), /*#__PURE__*/React.createElement("li", {
    className: "menu__item"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#about",
    className: "menu__link"
  }, "\u041E \u043F\u0440\u043E\u0435\u043A\u0442\u0435")), /*#__PURE__*/React.createElement("li", {
    className: "menu__item"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#practice",
    className: "menu__link"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-globe",
    alt: "Practice"
  }))), /*#__PURE__*/React.createElement("li", {
    className: "menu__item"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#contacts",
    className: "menu__link"
  }, "\u041E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0435"))))));
};

export { Header as default };
