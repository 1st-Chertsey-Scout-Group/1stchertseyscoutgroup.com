import * as React from "react";
import { Container } from "./container";
import type { ActionLink, MenuLink } from "@/types";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import { assertIsNode } from "@/lib/utils";
import clsx from "clsx";

type HeaderNavigationProps = {
  links: Array<MenuLink | ActionLink>;
  children: React.ReactNode;
  currentPath: string;
};

type HeaderNavigationState = {
  showMenu: boolean;
};

class HeaderNavigation extends React.Component<
  HeaderNavigationProps,
  HeaderNavigationState
> {
  constructor(props: HeaderNavigationProps) {
    super(props);

    this.state = {
      showMenu: false,
    };

    this.handleMenuToggle = this.handleMenuToggle.bind(this);
  }

  handleMenuToggle() {
    this.setState({ showMenu: !this.state.showMenu });
  }

  render() {
    return (
      <nav className="bg-white">
        <Container className="px-8 py-4">
          <div className="flex flex-wrap justify-between items-center">
            <a
              href="/"
              className="flex items-center gap-3 hover:no-underline text-black"
            >
              <span className="self-center text-xl font-black whitespace-nowrap">
                1st Chertsey
              </span>
              {this.props.children}
            </a>
            <button
              id="toggle"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm md:hidden"
              aria-controls="collapseMenu"
              aria-expanded={this.state.showMenu ? "true" : "false"}
              onClick={this.handleMenuToggle}
            >
              <span className="sr-only">Open main menu</span>

              {this.state.showMenu ? <X size={32} /> : <Menu size={32} />}
            </button>
            <div
              id="collapseMenu"
              aria-label="Main navigation"
              className={clsx(
                `items-center justify-between font-medium w-full md:flex md:w-auto md:order-1`,
                {
                  block: this.state.showMenu,
                  hidden: !this.state.showMenu,
                }
              )}
            >
              <ul className="flex flex-col pt-4 md:pt-0 p-0 md:space-x-8 rtl:space-x-reverse md:flex-row md:items-center">
                {this.props.links.map(({ text, href, links, type }, index) => (
                  <li
                    key={index}
                    className={clsx({
                      dropdown: links?.length,
                    })}
                  >
                    {type === "link" ? (
                      links?.length ? (
                        <DropdownLink
                          text={text}
                          links={links}
                          currentPath={this.props.currentPath}
                        />
                      ) : (
                        <Link
                          href={href}
                          text={text}
                          active={href === this.props.currentPath}
                        />
                      )
                    ) : (
                      <Action
                        href={href}
                        text={text}
                        active={href === this.props.currentPath}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </nav>
    );
  }
}

type ActionProps = {
  href?: string;
  text?: string;
  active: boolean;
};
class Action extends React.Component<ActionProps> {
  render(): React.ReactNode {
    return (
      <a
        className="block py-2 px-4 bg-primary text-primary-foreground hover:no-underline"
        href={this.props.href}
      >
        {this.props.text}
      </a>
    );
  }
}

type LinkProps = {
  href?: string;
  text?: string;
  active: boolean;
};
class Link extends React.Component<LinkProps> {
  render(): React.ReactNode {
    return (
      <a
        className={clsx(
          "block py-2 px-3 md:p-0 font-semibold text-neutral-700 hover:no-underline hover:text-primary",
          {
            "text-primary": this.props.active,
          }
        )}
        href={this.props.href}
      >
        {this.props.text}
      </a>
    );
  }
}

type DropdownLinkProps = {
  text?: string;
  links: Array<MenuLink>;
  currentPath?: string;
};

type DropdownLinkState = {
  show: boolean;
};
class DropdownLink extends React.Component<
  DropdownLinkProps,
  DropdownLinkState
> {
  wrapperRef: React.RefObject<HTMLDivElement>;
  id: string;
  constructor(props: DropdownLinkProps) {
    super(props);

    this.state = {
      show: false,
    };

    this.id = "ddl-" + this.props.text?.toLowerCase();
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleMenuToggle = this.handleMenuToggle.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside({ target }: MouseEvent) {
    assertIsNode(target);
    if (
      this.state.show &&
      this.wrapperRef?.current &&
      !this.wrapperRef.current.contains(target)
    ) {
      this.handleMenuToggle();
    }
  }

  handleMenuToggle() {
    this.setState({ show: !this.state.show });
  }

  iconClassName = "w-3.5 h-3.5 ml-0.5 rtl:ml-0 rtl:mr-0.5 inline";

  render(): React.ReactNode {
    return (
      <div ref={this.wrapperRef}>
        <button
          aria-controls={this.id}
          aria-expanded={this.state.show ? "true" : "false"}
          className="block py-2 px-3 md:p-0 font-semibold text-neutral-700 hover:no-underline hover:text-primary"
          onClick={this.handleMenuToggle}
        >
          {this.props.text}{" "}
          {this.state.show ? (
            <ChevronUp className={this.iconClassName} />
          ) : (
            <ChevronDown className={this.iconClassName} />
          )}
        </button>
        <ul
          id={this.id}
          className={clsx(
            "px-4 py-2 md:absolute bg-white min-w-40 md:border-2 border-t-0 border-l-0",
            {
              block: this.state.show,
              hidden: !this.state.show,
            }
          )}
        >
          {this.props.links.map(
            ({ text: childText, href: childHref }, index) => (
              <DropdownItemLink
                key={index}
                text={childText}
                href={childHref}
                active={childHref === this.props.currentPath}
              />
            )
          )}
        </ul>
      </div>
    );
  }
}

type DropdownItemLinkProps = {
  href?: string;
  text?: string;
  active: boolean;
};
class DropdownItemLink extends React.Component<DropdownItemLinkProps> {
  render(): React.ReactNode {
    return (
      <li>
        <a
          className={clsx(
            "block py-2 px-6 font-medium text-neutral-700 hover:no-underline hover:text-primary",
            {
              "text-primary": this.props.active,
            }
          )}
          href={this.props.href}
        >
          {this.props.text}
        </a>
      </li>
    );
  }
}

export { HeaderNavigation };
