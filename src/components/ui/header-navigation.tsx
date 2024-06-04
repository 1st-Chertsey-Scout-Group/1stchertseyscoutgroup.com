import * as React from "react";
import { Container } from "./container";
import { ThemeSwitcher } from "./theme-switcher";
import type { ActionLink, MenuLink } from "@/types";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import { assertIsNode, cn } from "@/lib/utils";

type HeaderNavigationProps = {
  links: Array<MenuLink | ActionLink>;
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
      <nav className="bg-background">
        <Container className="px-8 py-4">
          <div className="flex flex-wrap items-center justify-between">
            <a
              href="/"
              className="text-black flex items-center gap-3 hover:no-underline"
            >
              <span className="self-center whitespace-nowrap text-xl font-black text-foreground">
                1st Chertsey
              </span>

              <HeaderLogo />
            </a>
            <button
              id="toggle"
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center p-2 text-sm md:hidden"
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
              className={cn(
                `md:items-center justify-between font-medium w-full flex md:flex md:w-auto md:order-1 flex-col-reverse md:flex-row`,
                {
                  block: this.state.showMenu,
                  hidden: !this.state.showMenu,
                }
              )}
            >
              <ul className="flex flex-col p-0 px-4 md:flex-row md:items-center md:space-x-8 rtl:space-x-reverse">
                {this.props.links.map(({ text, href, links, type }, index) => (
                  <li
                    key={index}
                    className={cn({
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
              <div className="flex content-center justify-end px-2 pt-4 md:border-l-2 md:pt-0">
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        </Container>
      </nav>
    );
  }
}

class HeaderLogo extends React.Component {
  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 375 375"
        className="h-8 w-8"
      >
        <path
          className="fill-foreground"
          d="m187.472 358.357-3.815-1.688c-19.634-8.654-38.239-26.282-46.295-43.859l-2.302-5.029 3.226-4.484c7.431-10.283 12.845-22.589 15.235-34.431h19.282c-1.481 9.245-5.409 24.513-15.759 40.612 6.485 10.861 18.126 21.577 30.436 27.986l.019-.011.021.011c12.311-6.409 23.952-17.125 30.436-27.986-10.35-16.099-14.278-31.367-15.759-40.612h19.283c2.39 11.842 7.804 24.148 15.234 34.431l3.227 4.484-2.304 5.029c-8.054 17.577-26.662 35.205-46.293 43.859l-3.817 1.688-.028-.013-.027.013ZM79.093 252.12v-18.193h216.815v18.193H79.093Zm19.691-81.779c-8.098-12.426-21.911-27.239-41.705-27.252h-.096c-11.469 0-21.774 4.964-29.055 13.979-7.596 9.419-10.592 22.1-8.006 33.915l-18.538 4.058c-3.857-17.648.433-35.83 11.779-49.89 10.789-13.376 26.752-21.041 43.814-21.041h.136c22.369.01 42.282 12.413 57.57 35.86 12.854 19.71 18.992 42.002 20.592 57.215h-19.108c-1.643-12.451-6.919-30.806-17.383-46.844Zm38.672-3.553c-8.51-18.894-16.55-36.744-16.426-56.874.219-24.264 13.526-48.593 35.6-65.116 2.603-1.968 16.146-12.289 23.93-20.672l6.939-7.483 6.942 7.483c7.783 8.383 21.327 18.704 23.929 20.672 22.075 16.523 35.381 40.852 35.601 65.116.123 20.13-7.918 37.98-16.426 56.874-7.142 15.857-14.516 32.217-16.879 50.397H201.56c2.383-22.016 11.019-41.201 18.673-58.192 7.644-16.954 14.859-32.972 14.754-48.937-.158-18.355-10.625-37.067-28.003-50.079-3.047-2.292-11.702-8.934-19.485-16.079-7.779 7.145-16.437 13.787-19.481 16.079-17.379 13.012-27.846 31.724-28.005 50.079-.105 15.965 7.11 31.983 14.755 48.937 7.654 16.991 16.29 36.176 18.673 58.192h-19.106c-2.363-18.18-9.737-34.54-16.879-50.397Zm122.862-6.818c15.288-23.447 35.201-35.85 57.57-35.86h.136c17.061 0 33.025 7.665 43.814 21.041 11.344 14.06 15.635 32.242 11.779 49.89l-18.539-4.058c2.586-11.815-.41-24.496-8.006-33.915-7.279-9.015-17.585-13.979-29.054-13.979h-.096c-19.794.013-33.607 14.826-41.705 27.252-10.465 16.038-15.74 34.393-17.383 46.844h-19.108c1.6-15.213 7.738-37.505 20.592-57.215Z"
        />
      </svg>
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
        className="block bg-primary px-4 py-2 text-primary-foreground hover:no-underline"
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
        className={cn(
          "block py-2 px-3 md:p-0 font-semibold text-foreground hover:no-underline hover:text-primary",
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

  iconClassName = "ml-0.5 inline h-3.5 w-3.5 rtl:ml-0 rtl:mr-0.5";

  render(): React.ReactNode {
    return (
      <div ref={this.wrapperRef}>
        <button
          aria-controls={this.id}
          aria-expanded={this.state.show ? "true" : "false"}
          className="text-neutral-700 block px-3 py-2 font-semibold hover:text-primary hover:no-underline md:p-0"
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
          className={cn(
            "px-4 py-2 md:absolute bg-background min-w-40 md:border-2 border-t-0 border-l-0 z-50",
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
          className={cn(
            "block py-2 px-6 font-medium text-foreground hover:no-underline hover:text-primary",
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
