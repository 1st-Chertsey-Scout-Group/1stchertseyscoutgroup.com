import { Component } from "react";
import { Container } from "./container";
import { ShareButton } from "./share-button";
import { cn, toTitleCase } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

type BreadcrumbProps = {
  url: string;
};

type BreadcrumbState = {
  items: BreadcrumbItemProps[];
};

class Breadcrumb extends Component<BreadcrumbProps, BreadcrumbState> {
  constructor(props: BreadcrumbProps) {
    super(props);

    let items = this.createBreadcrumbItems(props.url);

    this.state = {
      items,
    };
  }

  createBreadcrumbItems(url: string) {
    let parts: BreadcrumbItemProps[] = [];

    const paths = url.split("/").filter((crumb: string) => crumb);
    paths.forEach((text: string, index: number) => {
      const generateHref = `/${paths.slice(0, index + 1).join("/")}`;
      const finalHref = "" + generateHref;

      const matches = text.match(/^(.+?)(\.[a-z0-9]+)?$/i);

      if (matches && matches[2]) {
        text = matches[1];
      }
      let minimise = !isNaN(parseInt(text, 10));
      text = text.replace(/[-_]/g, " ");
      text = toTitleCase(text);

      parts = [
        ...parts,
        {
          text: text,
          href: finalHref,
          location: paths.length === index + 1,
          minimise,
        },
      ];
    });

    return parts;
  }

  render() {
    return (
      <div className="bg-alternative text-alternative-foreground">
        <Container>
          <nav className="flex items-center p-2 justify-between">
            <ul className="mb-0 flex items-center justify-center space-x-2 pb-0">
              <BreadcrumbItem
                text="Home"
                href="/"
                location={false}
                minimise={true}
              />
              {this.state.items.map((props) => (
                <BreadcrumbItem {...props} />
              ))}
            </ul>
            <div>
              <ShareButton className=" text-alternative-foreground" />
            </div>
          </nav>
        </Container>
      </div>
    );
  }
}

type BreadcrumbItemProps = {
  text: string;
  href: string;
  location: boolean;
  minimise: boolean;
};

type BreadcrumbItemState = {};

class BreadcrumbItem extends Component<
  BreadcrumbItemProps,
  BreadcrumbItemState
> {
  constructor(props: BreadcrumbItemProps) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <li
        className={cn({
          "font-semibold": this.props.location,
          "hidden md:block": this.props.minimise,
        })}
      >
        <div className="flex space-x-2">
          {this.props.location ? (
            <div aria-current="location">{this.props.text}</div>
          ) : (
            <>
              <a href={this.props.href}>{this.props.text}</a>
              <ChevronRight size={26} />
            </>
          )}
        </div>
      </li>
    );
  }
}

export { Breadcrumb };
