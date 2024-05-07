import { cn } from "@/lib/utils";
import { Component } from "react";

type CardProps = {
  className?: string;
  children: React.ReactElement<CardImage | CardBody>[];
};

type CardState = {};

class Card extends Component<CardProps, CardState> {
  constructor(props: CardProps) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className={cn("p-2 flex flex-col", this.props.className)}>
        <div className="flex flex-col bg-card text-card-foreground h-full">
          {this.props.children}
        </div>
      </div>
    );
  }
}

type CardImageProps = {
  href?: string;
  children: React.ReactNode;
};

type CardImageState = {};

class CardImage extends Component<CardImageProps, CardImageState> {
  constructor(props: CardImageProps) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="relative h-60 max-h-60 overflow-hidden">
        {this.props.href ? (
          <a href={this.props.href}>{this.props.children}</a>
        ) : (
          this.props.children
        )}
      </div>
    );
  }
}

type CardBodyProps = {
  className?: string;
  children: React.ReactElement<CardCaption | CardHeader | CardFooter>[];
};

type CardBodyState = {};

class CardBody extends Component<CardBodyProps, CardBodyState> {
  constructor(props: CardBodyProps) {
    super(props);

    this.state = {};
  }

  render() {
    return <div  className={cn(this.props.className, "p-4")}>{this.props.children}</div>;
  }
}

type CardCaptionProps = {
  children: React.ReactNode;
};

type CardCaptionState = {};

class CardCaption extends Component<CardCaptionProps, CardCaptionState> {
  constructor(props: CardCaptionProps) {
    super(props);

    this.state = {};
  }

  render() {
    return <div className="text-sm pb-1">{this.props.children}</div>;
  }
}

type CardHeaderProps = {
  href?: string;
  children: React.ReactNode;
};

type CardHeaderState = {};

class CardHeader extends Component<CardHeaderProps, CardHeaderState> {
  constructor(props: CardHeaderProps) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="text-xl pb-1 font-black">
        {this.props.href ? (
          <a className="block text-card-foreground" href={this.props.href}>
            {this.props.children}
          </a>
        ) : (
          <>{this.props.children}</>
        )}
      </div>
    );
  }
}

type CardContentProps = {
  children: React.ReactNode;
};

type CardContentState = {};

class CardContent extends Component<CardContentProps, CardContentState> {
  constructor(props: CardContentProps) {
    super(props);

    this.state = {};
  }

  render() {
    return <p>{this.props.children}</p>;
  }
}

type CardFooterProps = {
  href: string;
  children: React.ReactNode;
};

type CardFooterState = {};

class CardFooter extends Component<CardFooterProps, CardFooterState> {
  constructor(props: CardFooterProps) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <a className="font-bold mt-auto" href={this.props.href}>
        {this.props.children}
      </a>
    );
  }
}

export {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CardImage,
  CardContent,
  CardCaption,
};
